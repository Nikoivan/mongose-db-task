import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express, { type Express } from 'express';

import { bookRouter } from './features/book/routes.js';
import { errorHandlerMiddleware } from './middlewares/error-handler/error-handler-mw.js';
import { baseRouter } from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const buildApp = (): Express => {
  const app = express();

  // app.use(express.json());
  app.use(express.urlencoded());
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'views'));
  app.use('/', baseRouter);
  app.use('/books', bookRouter);
  // app.use('/api', baseRouter);
  app.use(errorHandlerMiddleware);

  return app;
};
