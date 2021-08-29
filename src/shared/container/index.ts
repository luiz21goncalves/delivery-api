import { container } from 'tsyringe';

import { TypeormUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeormUsersRepositories';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository,
);
