import { compare, hash } from 'bcrypt';

import { IHashProvider } from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  async genareteHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHashProvider };
