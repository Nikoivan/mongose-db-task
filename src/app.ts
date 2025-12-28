import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express, { type Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import type { CallBack } from './features/user/domain.js';
import { authService } from './features/user/services/auth-service.js';
import { userService } from './features/user/services/user-service.js';
import { baseRouter } from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const buildApp = (): Express => {
  const { options, verify } = authService;

  passport.use('local', new LocalStrategy(options, verify));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (id: string, done: CallBack) => {
    await userService.getUserById(id, (err: Error, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  });

  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'views'));
  app.use(express.urlencoded({ extended: true }));
  app.use(session({ secret: 'secret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api', baseRouter);

  return app;
};
