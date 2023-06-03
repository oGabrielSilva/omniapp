import { PrismaClient } from '@prisma/client';

interface PageProps {
  logged: boolean;
  lang: string;
  nickname: string;
}

declare global {
  var client: PrismaClient;
}
