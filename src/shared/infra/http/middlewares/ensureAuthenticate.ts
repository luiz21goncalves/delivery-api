import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { TypeormUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeormUsersRepositories';
import { EnsureAuthenticateException } from '@shared/exceptions/EnsureAuthenticateExceptionts';

interface IPayload {
  sub: string;
}

async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new EnsureAuthenticateException.MissingToken();
  }
  const [bearer, token] = authHeader.split(' ');

  if (!bearer || !token) {
    throw new EnsureAuthenticateException.MissingToken();
  }

  try {
    const { sub: user_id } = verify(
      token,
      String(authConfig.secret),
    ) as IPayload;

    const usersRepository = new TypeormUsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new EnsureAuthenticateException.UserNotFound();
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new EnsureAuthenticateException.InvalidToken();
  }
}

export { ensureAuthenticate };
