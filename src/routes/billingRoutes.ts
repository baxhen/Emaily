import express, { Response, Request } from 'express';
import Stripe from 'stripe';

import * as env from '../config/keys';
import { Keys } from '../server';
import { Token } from '../interfaces';
import { User } from '../interfaces';
import { requireLogin } from '../middlewares/requireLogin';

export const billingRoutes = express.Router();
const { stripeSecretKey } = env as Keys;
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2020-03-02',
  typescript: true,
});

billingRoutes.post(
  '/api/stripe',
  requireLogin,
  async (req: Request, res: Response) => {
    const { id } = req.body as Token;

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: id,
    });

    const user = req.user as User;
    user.credits += 5;
    const updatedUser = await user.save<User>();
    res.send(updatedUser);
  }
);
