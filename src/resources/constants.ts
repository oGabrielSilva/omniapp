import bcryptjs from 'bcryptjs';

export const LANGUAGE_COOKIE_NAME = 'LangCookieName';
export const AUTH_COOKIE_NAME = 'AuthCookieSerialized';
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NICKNAME_REGEX = /^[A-Za-z0-9@\.\-_]+$/;
export const QUAKE_EFFECT_CLASS = 'quake';
export const HASH_SALT = bcryptjs.genSaltSync();
export const AES_SECRET = process.env.AES_KEY || 'aes_omniapp_key';
export const NAV_ITEM_SELECTED_CLASS = 'nav-selected';
