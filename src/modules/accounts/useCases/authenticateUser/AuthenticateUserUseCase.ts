import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { logger } from '@shared/logger';

import { AuthenticateUserException } from './AuthenticateUserException';
import { IAuthenticateUserDTO } from './IAuthenticateUserDTO';
import { IAuthenticateUserResponseDTO } from './IAuthenticateUserResponseDTO';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const { secret, expires_in } = authConfig;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      logger.warn(`login attempt with email ${email}`);
      throw new AuthenticateUserException();
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      logger.warn(`wrong password for user ${user.id}`);
      throw new AuthenticateUserException();
    }

    const token = sign({}, String(secret), {
      subject: user.id,
      expiresIn: expires_in,
    });

    logger.info(`user ${user.id} logged`);

    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
