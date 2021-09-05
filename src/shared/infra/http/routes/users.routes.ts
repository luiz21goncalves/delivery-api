import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
  createUserController.handle,
);

export { usersRoutes };
