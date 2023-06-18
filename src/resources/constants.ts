import bcryptjs from 'bcryptjs';

export const LANGUAGE_COOKIE_NAME = 'LangCookieName';
export const AUTH_COOKIE_NAME = 'AuthCookieSerialized';
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NICKNAME_REGEX = /^[A-Za-z0-9@\.\-_]+$/;
export const QUAKE_EFFECT_CLASS = 'quake';
export const HASH_SALT = bcryptjs.genSaltSync();
export const AES_SECRET = process.env.AES_KEY || 'aes_omniapp_key';
export const NAV_ITEM_SELECTED_CLASS = 'nav-selected';
export const IS_FOCUSED_CLASS = 'is-focused';
export const LINE_CLASS = 'line';
export const LINE_SELECTED_CLASS = 'line-selected';
export const TEXT_RICH_ID = 'text-rich-id';
export const TEXT_RICH_CONTAINER_ID = 'text-rich-container-id';
