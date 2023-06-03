import { Exception } from './Exception';

export class BadRequest extends Exception {
  constructor(cause: string) {
    super(cause, 400, 'BAD_REQUEST');
  }
}
