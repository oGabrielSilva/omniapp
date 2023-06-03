import { Exception } from './Exception';

export class InternalServerError extends Exception {
  constructor(cause: string) {
    super(cause, 500, 'INTERNAL_SERVER_ERROR');
  }
}
