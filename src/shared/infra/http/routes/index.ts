import { Router } from 'express';

import { logger } from '@shared/logger';

const routes = Router();

routes.get('/', (request, response) => {
  logger.info('test route');

  return response.json({
    ok: true,
  });
});

export { routes };
