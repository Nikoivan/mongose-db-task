import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import passport from 'passport';

import { userService } from '~/features/user/services/user-service.js';

export const userRouter = Router();

userRouter.get('/', (request: Request, response) => {
  response.render('user/home', { user: request.user });
});

userRouter.get('/login', (request, response) => {
  response.render('user/login');
});

userRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/user/login',
  }),
  (req: Request, res: Response) => {
    console.log('req.user:', req.body);
    res.redirect('/api/user');
  },
);

userRouter.get('/signup', (request, response) => {
  response.render('user/signup');
});

userRouter.post('/signup', async (req: Request, res: Response) => {
  await userService.createUser(req.body);

  passport.authenticate('local', {
    failureRedirect: '/api/user/login',
  });
  res.redirect('/api/user/me');
});

userRouter.get('/logout', (request: Request, res: Response) => {
  request.logout(() => console.log('logout'));
  res.redirect('/api/user');
});

userRouter.get(
  '/me',
  (request: Request, response: Response, next: NextFunction) => {
    if (!request.isAuthenticated()) {
      return response.redirect('/api/user/login');
    }
    next();
  },
  (req, res) => {
    res.render('user/profile', { user: req.user });
  },
);
