import 'reflect-metadata';

import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import expressPinoLogger from 'express-pino-logger';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-node-fs-backend';
import pino from 'pino';

import '@shared/container';
import { createDatabaseConnetion } from '../typeorm';
import { generateException } from './middlewares/generateException';
import { routes } from './routes';

const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `${__dirname}/../../resources/locales/{{lng}}/{{ns}}.json`,
      addPath: 'locales/{{lng}}/{{ns}}.missing.json',
    },
    fallbackLng: 'en',
    preload: ['pt-BR', 'en'],
  });

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
app.use(i18nextMiddleware.handle(i18next));
app.use(routes);
app.use(errors());
app.use(generateException);

export { app };
