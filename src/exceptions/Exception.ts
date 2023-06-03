export class Exception extends Error {
  constructor(readonly cause: string, readonly status: number, readonly code = 'EXCEPTION') {
    super(cause);
  }
}
