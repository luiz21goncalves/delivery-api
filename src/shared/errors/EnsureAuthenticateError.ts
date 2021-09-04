/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from './AppError';

namespace EnsureAuthenticateError {
  export class MissingToken extends AppError {
    constructor() {
      super('Token missing');
    }
  }

  export class BadlyFormatted extends AppError {
    constructor() {
      super('Token badly formatted', 401);
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super('User does not exists', 401);
    }
  }

  export class InvalidToken extends AppError {
    constructor() {
      super('Invalid token', 401);
    }
  }
}

export { EnsureAuthenticateError };
