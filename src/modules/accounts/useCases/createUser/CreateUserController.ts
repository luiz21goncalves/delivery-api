import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { logger } from '@shared/logger';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    logger.debug({
      class: 'CreateUserController',
      args: { name, email, password },
    });

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email, password });

    logger.debug({ class: 'CreateUserController', user });
    logger.info(`created user ${user.id} ${user.name}`);

    return response.status(201).json(user);
  }
}

export { CreateUserController };
