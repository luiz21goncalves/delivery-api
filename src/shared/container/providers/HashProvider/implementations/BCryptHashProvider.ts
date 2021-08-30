import { compare, hash } from 'bcrypt';

import { IHashProvider } from '../models/IHashProvider';

class BCryptHahsProvider implements IHashProvider {
  async genareteHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHahsProvider };
