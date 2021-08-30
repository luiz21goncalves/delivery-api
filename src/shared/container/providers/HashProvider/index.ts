import { container } from 'tsyringe';

import { BCryptHahsProvider } from './implementations/BCryptHashProvider';

container.registerSingleton<BCryptHahsProvider>(
  'BCryptHahsProvider',
  BCryptHahsProvider,
);
