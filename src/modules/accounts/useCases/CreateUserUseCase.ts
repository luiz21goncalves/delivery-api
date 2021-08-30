import { inject, injectable } from 'tsyringe';

import { logger } from '@shared/logger';

import { IUsersRepository } from '../repositories/IUsersRepository';
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
      throw new Error('user already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    logger.debug({ class: 'CreateUserController', user });

    return user;
  }
}

export { CreateUserUseCase };
