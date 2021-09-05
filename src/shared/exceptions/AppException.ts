import { TranslationKeys } from '@types/i18next.keys';

class AppException {
  public readonly message: TranslationKeys;

  public readonly statusCode: number;

  constructor(message: TranslationKeys, statusCode = 400) {
    Object.assign(this, { message, statusCode });
  }
}

export { AppException };
