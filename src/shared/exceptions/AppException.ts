import { ResourceKey } from 'i18next';

class AppException {
  public readonly message: ResourceKey;

  public readonly statusCode: number;

  constructor(message: ResourceKey, statusCode = 400) {
    Object.assign(this, { message, statusCode });
  }
}

export { AppException };
