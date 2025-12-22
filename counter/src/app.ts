import express, { type Express } from 'express';

import { errorHandlerMiddleware } from './middlewares/error-handler/error-handler-mw.js';
import { baseRouter } from './routes.js';

export const buildApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use('/', baseRouter);
  app.use(errorHandlerMiddleware);

  return app;
};
