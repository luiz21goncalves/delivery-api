import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { logger } from '@shared/logger';

import { CreateUserError } from './CreateUserError';
import { ICreateUserDTO } from './ICreateUserDTO';

interface IResponse extends ICreateUserDTO {
  id: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<IResponse> {
    logger.debug({
      class: 'CreateUserController',
      args: { name, email, password },
    });

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    logger.debug({
      class: 'CreateUserUseCase',
      userAlreadyExists,
    });

    if (userAlreadyExists) {
      logger.warn(`create attempt for email ${email}`);
      throw new CreateUserError();
    }

    const passwordHash = await this.hashProvider.genareteHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    logger.debug({ class: 'CreateUserController', user });

    return user;
  }
}

export { CreateUserUseCase };
