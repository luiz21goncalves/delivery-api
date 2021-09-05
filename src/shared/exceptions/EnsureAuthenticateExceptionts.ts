/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppException } from './AppException';

namespace EnsureAuthenticateException {
  export class MissingToken extends AppException {
    constructor() {
      super('missing_auth_token');
    }
  }

  export class BadlyFormatted extends AppException {
    constructor() {
      super('invalid_token', 401);
    }
  }

  export class UserNotFound extends AppException {
    constructor() {
      super('user_is_not_registered', 401);
    }
  }

  export class InvalidToken extends AppException {
    constructor() {
      super('invalid_token', 401);
    }
  }
}

export { EnsureAuthenticateException };
