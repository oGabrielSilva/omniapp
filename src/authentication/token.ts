import { AES_SECRET, AUTH_COOKIE_NAME } from '@Omniapp/resources/constants';
import { serialize } from 'cookie';
import CryptoJS from 'crypto-js';

export const generateToken = (id: string, nickname: string) => {
  const now = Date.now();
  const expires = new Date(now + 7 * 24 * 60 * 60 * 1000).getTime();
  const enc = `${id}{--}${nickname}{--}${expires}{--}${now}`;
  const token = CryptoJS.AES.encrypt(enc, AES_SECRET).toString();
  const cookie = serialize(AUTH_COOKIE_NAME, token, {
    expires: new Date(expires),
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: expires,
  });
  return { expires, token, cookie };
};

export const undoToken = (tokenDecrypted: string) => {
  const [id, nickname, expiresAt, createdAt] = tokenDecrypted.split('{--}');
  return { id, nickname, expiresAt, createdAt };
};

export const decryptToken = (tk: string) => {
  const token = CryptoJS.AES.decrypt(tk, AES_SECRET).toString(CryptoJS.enc.Utf8);
  return token;
};

export const tokenIsValid = (tk: string | undefined, decrypted = true) => {
  if (!tk) return false;
  const [, , expiresAt, createdAt] = (decrypted ? tk : decryptToken(tk)).split('{--}');
  if (Number.isNaN(Number(expiresAt)) || Number.isNaN(Number(createdAt))) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return Number(expiresAt) > Number(createdAt);
};
