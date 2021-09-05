import { AppException } from '@shared/exceptions/AppException';

class CreateUserException extends AppException {
  constructor() {
    super('email_already_registered');
  }
}

export { CreateUserException };
