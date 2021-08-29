import cors from 'cors';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import pino from 'pino';

import { logger } from './logger';

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

app.listen(3333, () => logger.info('Server started on port 3333!'));
