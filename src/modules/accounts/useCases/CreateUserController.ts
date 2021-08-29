import { Request, Response } from 'express';

import { logger } from '@shared/logger';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    logger.debug({ class: 'CreateUserController', args: { name, email, password } });

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({ name, email, password });

    logger.debug({ class: 'CreateUserController', user });

    return response.json(user);
  }
}

export { CreateUserController };
