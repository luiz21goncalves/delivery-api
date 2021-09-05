import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().options({ abortEarly: false }).keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  authenticateUserController.handle,
);

export { authenticateRoutes };
