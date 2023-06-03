import { NICKNAME_REGEX } from '@Omniapp/resources/constants';

export const nicknameIsValid = (nickname: string, rgx = NICKNAME_REGEX) =>
  rgx.test(nickname) && nickname.length >= 3;
