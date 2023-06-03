import { EMAIL_REGEX } from '@Omniapp/resources/constants';

export const emailISValid = (email: string, rgx = EMAIL_REGEX) => rgx.test(email);
