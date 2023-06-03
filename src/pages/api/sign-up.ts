// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { getDBClient } from '@Omniapp/db/client';
import { BadRequest } from '@Omniapp/exceptions/BadRequest';
import { Conflict } from '@Omniapp/exceptions/Conflict';
import { Exception } from '@Omniapp/exceptions/Exception';
import { InternalServerError } from '@Omniapp/exceptions/InternalServerError';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { HASH_SALT } from '@Omniapp/resources/constants';
import { emailISValid } from '@Omniapp/utils/emailIsValid';
import { generateToken } from '@Omniapp/authentication/token';
import { UserModel } from '@Omniapp/models/UserModel';

const client = getDBClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, surname, email, nickname, password: pass } = req.body;
    if (!name || typeof name !== 'string') throw new BadRequest('name is required');
    if (name.length < 2) throw new BadRequest('name is too short');
    if (!email || typeof email !== 'string') throw new BadRequest('email is required');
    if (!emailISValid(email)) throw new BadRequest('invalid email');
    if (!nickname || typeof nickname !== 'string') throw new BadRequest('nickname is required');
    if (nickname.length < 3) throw new BadRequest('invalid nickname');
    if (!pass || typeof pass !== 'string') throw new BadRequest('password is required');
    if (pass.length < 8) throw new BadRequest('invalid password');
    const userByEmailOrNickname = await client.user.findFirst({
      where: { OR: [{ nickname }, { email }] },
    });
    if (userByEmailOrNickname)
      throw new Conflict(
        userByEmailOrNickname.email === email ? 'email already in use' : 'nickname already in use'
      );
    const password = bcryptjs.hashSync(pass, HASH_SALT);
    const user = await client.user.create({
      data: { email, name, nickname, surname: surname || '', password },
    });
    const { cookie } = generateToken(user.id, user.nickname);
    res.setHeader('Set-Cookie', cookie);
    res.status(201).json(new APIResponse(true, UserModel.from(user)));
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
