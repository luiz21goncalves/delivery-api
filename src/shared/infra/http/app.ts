import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import expressPinoLogger from 'express-pino-logger';
import pino from 'pino';

import { AppError } from '@shared/errors/AppError';
import { logger } from '@shared/logger';
import '@shared/container';

import { createDatabaseConnetion } from '../typeorm';
import { routes } from './routes';

const app = express();

createDatabaseConnetion();

const [date] = new Date().toISOString().split(/T/g);

app.use(
  expressPinoLogger(
    {
      prettyPrint: {
        colorize: false,
        singleLine: true,
      },
    },
    pino.destination(`./logs/request/${date}.log`),
  ),
);

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(
  (err: Error, resquest: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: err.message,
        statusCode: err.statusCode,
      });
    }

    logger.error({ middleware: 'Error Middleware', err });

    return response.status(500).json({
      message: 'Internal server error',
      statusCode: 500,
    });
  },
);

export { app };
