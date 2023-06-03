// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { getDBClient } from '@Omniapp/db/client';
import { BadRequest } from '@Omniapp/exceptions/BadRequest';
import { Exception } from '@Omniapp/exceptions/Exception';
import { InternalServerError } from '@Omniapp/exceptions/InternalServerError';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { generateToken } from '@Omniapp/authentication/token';
import { UserModel } from '@Omniapp/models/UserModel';
import { NotFound } from '@Omniapp/exceptions/NotFound';
import { Unauthorized } from '@Omniapp/exceptions/Unauthorized';

const client = getDBClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user: u, password: pass } = req.body;
    if (!u || typeof u !== 'string') throw new BadRequest('user is required');

    if (!pass || typeof pass !== 'string') throw new BadRequest('password is required');
    if (pass.length < 8) throw new BadRequest('invalid password');
    const userByEmailOrNickname = await client.user.findFirst({
      where: { OR: [{ nickname: u }, { email: u }] },
    });
    if (!userByEmailOrNickname) throw new NotFound('user not found');
    if (!bcryptjs.compareSync(pass, userByEmailOrNickname.password))
      throw new Unauthorized('password incorrect');
    const { cookie } = generateToken(userByEmailOrNickname.id, userByEmailOrNickname.nickname);
    res.setHeader('Set-Cookie', cookie);
    res.status(201).json(new APIResponse(true, UserModel.from(userByEmailOrNickname)));
  } catch (error) {
    if (error instanceof Exception) {
      return res.status(error.status).json(new APIResponse(false, null, error));
    }
    console.log(error);
    return res
      .status(500)
      .json(new APIResponse(false, null, new InternalServerError('oops, we had an unknown error')));
  }
}
