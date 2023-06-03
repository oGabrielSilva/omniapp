import { Exception } from './Exception';

export class NotFound extends Exception {
  constructor(cause: string) {
    super(cause, 404, 'NOT_FOUND');
  }
}
