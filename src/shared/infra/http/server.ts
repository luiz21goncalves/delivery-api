import 'dotenv/config';

import { logger } from '@shared/logger';

import { app } from './app';

const port = process.env.PORT ?? 3333;

app.listen(port, () => logger.info(`Server started on port ${port}!`));
