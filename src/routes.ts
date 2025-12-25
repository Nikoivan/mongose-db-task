import { Router } from 'express';

import { bookRouter } from '../src/features/book/routes.js';
import { userRouter } from '../src/features/user/user-routes.js';

export const baseRouter = Router();

baseRouter.use('/user', userRouter);
baseRouter.use('/books', bookRouter);
