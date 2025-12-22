import { Router } from 'express';

import { userController } from '../user/user-controller.js';

export const userRouter = Router();

userRouter.get('/login', userController.login);
