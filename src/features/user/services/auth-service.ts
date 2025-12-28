import { type UserEntity } from '../../../db/models/user-schema.js';
import type { CallBack } from '../domain.js';
import { userService } from './user-service.js';

const verify = async (username: string, password: string, done: CallBack) => {
  const user = await userService.getUserByLogin(
    username,
    (err?: Error, user?: UserEntity) => {
      if (err) return done(err);
      if (!user) return done(null, false);

      if (!userService.verifyPassword(user, password)) {
        return done(null, false);
      }
    },
  );

  return done(null, user);
};

const options = {
  usernameField: 'login',
  passwordField: 'password',
};

export const authService = { verify, options };
