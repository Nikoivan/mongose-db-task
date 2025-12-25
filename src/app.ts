import express, { type Express } from 'express';

import { baseRouter } from './routes.js';

export const buildApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use('/api', baseRouter);

  return app;
};
