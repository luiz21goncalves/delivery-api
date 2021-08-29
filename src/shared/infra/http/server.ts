import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import pino from 'pino';

import { logger } from '@shared/logger';

const app = express();

const [date] = new Date().toISOString().split(/T/g);

app.use(expressPinoLogger({
  prettyPrint: {
    colorize: false,
    singleLine: true,
  },
}, pino.destination(`./logs/request/${date}.log`)));

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  logger.info('test route');

  return response.json({
    ok: true,
  });
});

const port = process.env.PORT ?? 3333;

app.listen(port, () => logger.info(`Server started on port ${port}!`));
