import pino from 'pino';

import { name } from '../../package.json';

const [date] = new Date().toISOString().split(/T/g);

const logger = pino({
  name,
  prettyPrint: {
    colorize: false,
    singleLine: true,
  },
  level: process.env.LOGGER_LEVEL,
}, pino.destination(`./logs/app/${date}.log`));

export { logger };
