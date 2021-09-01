import { container } from 'tsyringe';

import { logger } from '@shared/logger';

import { BCryptHashProvider } from './implementations/BCryptHashProvider';

container.registerSingleton<BCryptHashProvider>(
  'BCryptHashProvider',
  BCryptHashProvider,
);

logger.info('register singleton for BCryptHahsProvider');
