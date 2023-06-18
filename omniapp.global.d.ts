import { PrismaClient } from '@prisma/client';

interface PageProps {
  logged: boolean;
  lang: string;
  nickname: string;
}

declare global {
  var client: PrismaClient;
  type TextAlign = 'left' | 'right' | 'justify' | 'center';
  type TextType = 'normal' | 'h1' | 'h2' | 'h3' | 'small';
}
