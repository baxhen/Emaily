import passport from 'passport';
import express, { Response, Request } from 'express';
import * as env from '../config/keys';
import { Keys } from '../server';

const { clientURI } = env as Keys;
export const authRoutes = express.Router();

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.redirect(clientURI + '/surveys');
  }
);

authRoutes.get('/api/current_user', (req: Request, res: Response) => {
  res.send(req.user);
});

authRoutes.get('/api/logout', (req: Request, res: Response) => {
  req.logOut();
  res.redirect(clientURI + '/');
});
