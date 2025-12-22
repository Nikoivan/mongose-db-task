import type { NextFunction, Response } from 'express';

import { BookError } from '../../book/model/book-error.js';

export const handleError = (
  response: Response,
  next: NextFunction,
  error: unknown,
) => {
  if (error instanceof BookError) {
    response.status(error.code);
    response.json(error.message);
  }

  next(error);
};
