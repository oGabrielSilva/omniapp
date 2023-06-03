import { Exception } from './Exception';

export class Unauthorized extends Exception {
  constructor(cause: string) {
    super(cause, 401, 'UNAUTHORIZED');
  }
}
