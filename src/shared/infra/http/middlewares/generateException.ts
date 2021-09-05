import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';
import { logger } from '@shared/logger';

function generateException(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppException) {
    logger.debug({ middleware: 'app exception', err });

    return response.status(err.statusCode).json({
      message: request.t(err.message),
      statusCode: err.statusCode,
    });
  }
  logger.error({ middleware: 'internal exception', err });

  return response.status(500).json({
    message: request.t('internal_server_error'),
    statusCode: 500,
  });
}

export { generateException };
