import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces';

export const requireCredits = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  if (user.credits < 1) {
    return res.status(402).send({ error: 'Not enough credits!' });
  }

  next();
};
