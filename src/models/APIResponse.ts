import { Exception } from '@Omniapp/exceptions/Exception';

export class APIResponse<T = null> {
  readonly timestamp = Date.now();

  constructor(
    readonly success: boolean,
    readonly body: T | null = null,
    readonly error: Exception | null = null
  ) {}
}
