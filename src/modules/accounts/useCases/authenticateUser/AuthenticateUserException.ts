import { AppException } from '@shared/exceptions/AppException';

class AuthenticateUserException extends AppException {
  constructor() {
    super('incorrect_credentials');
  }
}

export { AuthenticateUserException };
