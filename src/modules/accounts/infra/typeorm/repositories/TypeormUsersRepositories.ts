import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/ICreateUserDTO';
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

  async findByEmail(email: string): Promise<User | undefined> {
    logger.debug({
      class: 'TypeormUsersRepository',
      fn: 'findByEmail',
      args: { email },
    });

    const user = this.repository.findOne({
      where: { email },
    });

    logger.debug({
      class: 'TypeormUsersRepository',
      fn: 'findByEmail',
      user,
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    logger.debug({
      class: 'TypeormUsersRepository',
      fn: 'findById',
      user,
    });

    return user;
  }
}

export { TypeormUsersRepository };
