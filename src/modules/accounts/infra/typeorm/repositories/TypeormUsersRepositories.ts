import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/useCases/ICreateUserDTO';
import { logger } from '@shared/logger';

import { User } from '../entities/User';

class TypeormUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    logger.debug({
      class: 'TypeormUsersRepository',
      fn: 'create',
      args: { name, email, password },
    });

    const user = this.repository.create({
      name,
      email,
      password,
    });

    logger.debug({
      class: 'TypeormUsersRepository',
      fn: 'create',
      user,
    });

    return this.repository.save(user);
  }
}

export { TypeormUsersRepository };
