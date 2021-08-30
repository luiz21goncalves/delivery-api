import './providers';

import { container } from 'tsyringe';

import { TypeormUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeormUsersRepositories';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { logger } from '@shared/logger';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository,
);

logger.info('register singleton for TypeormUsersRepository');
