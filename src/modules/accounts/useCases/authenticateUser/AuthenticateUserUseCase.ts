import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { logger } from '@shared/logger';

import { AuthenticateUserError } from './AuthenticateUserError';
import { IAuthenticateUserDTO } from './IAuthenticateUserDTO';
import { IAuthenticateUserResponseDTO } from './IAuthenticateUserResponseDTO';

class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      logger.warn(`login attempt with email ${email}`);
      throw new AuthenticateUserError();
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      logger.warn(`wrong password for user ${user.id}`);
      throw new AuthenticateUserError();
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '4h',
    });

    logger.info(`user ${user.id} logged`);

    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
