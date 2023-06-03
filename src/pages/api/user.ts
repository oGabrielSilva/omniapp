import { getDBClient } from '@Omniapp/db/client';
import { BadRequest } from '@Omniapp/exceptions/BadRequest';
import { Exception } from '@Omniapp/exceptions/Exception';
import { InternalServerError } from '@Omniapp/exceptions/InternalServerError';
import { NotFound } from '@Omniapp/exceptions/NotFound';
import { APIResponse } from '@Omniapp/models/APIResponse';
import { UserModel } from '@Omniapp/models/UserModel';
import { NextApiRequest, NextApiResponse } from 'next';

const client = getDBClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nickname } = req.query;
    if (!nickname || typeof nickname !== 'string') throw new BadRequest('nickname is required');
    const user = await client.user.findUnique({ where: { nickname } });
    if (!user) throw new NotFound('user not found');
    res.status(200).json(new APIResponse(true, UserModel.from(user)));
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
