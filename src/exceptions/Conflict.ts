import { Exception } from './Exception';

export class Conflict extends Exception {
  constructor(cause: string) {
    super(cause, 409, 'CONFLICT');
  }
}
