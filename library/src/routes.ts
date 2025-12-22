import type { Request, Response } from 'express';
import { Router } from 'express';

export const baseRouter = Router();

// baseRouter.use('/user', userRouter);
// baseRouter.use('/books', bookRouter);

baseRouter.get('/', (request: Request, response: Response) => {
  response.render('index', {
    title: 'Главная',
  });
});
