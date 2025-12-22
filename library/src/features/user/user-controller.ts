import type { NextFunction, Request, Response } from 'express';

import { mockDb } from '../../db/mock-db.js';
import { UserError } from '../user/model/user-error.js';
import { handleError } from '../user/utils/handler-utils.js';

class UserController {
  public login(request: Request, response: Response, next: NextFunction) {
    try {
      const user = mockDb.user.getUser();

      if (!user) {
        throw new UserError('Пользователь не найден', 404);
      }

      response.set('Content-Type', 'application/json').status(200).json(user);
    } catch (error) {
      handleError(response, next, error);
    }
  }
}

export const userController = new UserController();
