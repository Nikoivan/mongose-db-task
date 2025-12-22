import { Router } from 'express';

import { counterController } from './counter-controller.js';

export const counterRouter = Router();

counterRouter.get('/:bookId', counterController.getCountById);
counterRouter.post('/:bookId/incr', counterController.incrementCount);
