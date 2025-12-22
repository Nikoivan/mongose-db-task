import type { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!err) return next();
  console.error(err.stack);
  response.status(500).send({ error: err.message });
};
