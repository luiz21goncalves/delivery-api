import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/accounts/useCases/createUser/ICreateUserDTO';
import { logger } from '@shared/logger';

import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    logger.debug({
      class: 'InMemoryUsersRepository',
      fn: 'create',
      args: { name, email, password },
    });

    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    logger.debug({
      class: 'InMemoryUsersRepository',
      fn: 'create',
      user,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    logger.debug({
      class: 'InMemoryUsersRepository',
      fn: 'findByEmail',
      args: { email },
    });

    const user = this.users.find((findUser) => findUser.email === email);

    logger.debug({
      class: 'InMemoryUsersRepository',
      fn: 'findByEmail',
      user,
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.id === id);

    logger.debug({
      class: 'InMemoryUsersRepository',
      fn: 'findById',
      user,
    });

    return user;
  }
}

export { InMemoryUsersRepository };
