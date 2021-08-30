import { IHashProvider } from '../models/IHashProvider';

class InMemoryHashProvider implements IHashProvider {
  async genareteHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export { InMemoryHashProvider };
