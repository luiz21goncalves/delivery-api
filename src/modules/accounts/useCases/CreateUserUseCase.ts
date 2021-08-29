import { v4 as uuid } from 'uuid';

import { logger } from '@shared/logger';

import { ICreateUserDTO } from './ICreateUserDTO';

interface IResponse extends ICreateUserDTO {
  id: string;
  created_at: Date;
  updated_at: Date;
}

class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO): Promise<IResponse> {
    logger.debug({ class: 'CreateUserController', args: { name, email, password } });

    const user = {
      id: uuid(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    logger.debug({ class: 'CreateUserController', user });

    return user;
  }
}

export { CreateUserUseCase };
