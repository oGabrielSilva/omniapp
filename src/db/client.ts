import { PrismaClient } from '@prisma/client';

export const getDBClient = () => {
  if (!global.client) global.client = new PrismaClient();
  return global.client;
};
