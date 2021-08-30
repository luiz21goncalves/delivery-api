import { container } from 'tsyringe';

import { logger } from '@shared/logger';

import { BCryptHahsProvider } from './implementations/BCryptHashProvider';

container.registerSingleton<BCryptHahsProvider>(
  'BCryptHahsProvider',
  BCryptHahsProvider,
);

logger.info('register singleton for BCryptHahsProvider');
