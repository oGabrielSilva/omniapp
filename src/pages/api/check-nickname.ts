import { getDBClient } from '@Omniapp/db/client';
import { BadRequest } from '@Omniapp/exceptions/BadRequest';
import { Exception } from '@Omniapp/exceptions/Exception';
import { InternalServerError } from '@Omniapp/exceptions/InternalServerError';
import { NotFound } from '@Omniapp/exceptions/NotFound';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { NextApiRequest, NextApiResponse } from 'next';

const client = getDBClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nickname } = req.query;
    if (!nickname || typeof nickname !== 'string') throw new BadRequest('nickname not provided');
    if (nickname.length < 3) throw new BadRequest('nickname must be at least 3 characters long');
    const userByNickname = await client.user.findUnique({ where: { nickname } });
    if (!userByNickname) throw new NotFound('user with that nickname not found');
    res.status(200).json(new APIResponse(true));
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
