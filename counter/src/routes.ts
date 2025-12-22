import { Router } from 'express';

import { counterRouter } from './features/counter/router.js';

export const baseRouter = Router();

baseRouter.use('/counter', counterRouter);
