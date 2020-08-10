import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';

import './models/User';
import './models/Survey';
import './services/passport';
import * as env from './config/keys';
import { authRoutes } from './routes/authRoutes';
import { billingRoutes } from './routes/billingRoutes';
import { surveyRoutes } from './routes/surveyRoutes';

export interface Keys {
  googleClientID: string;
  googleClientSecret: string;
  mongoURI: string;
  cookieKey: string;
  googleProxy: string;
  clientURI: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
  sendGridKey: string;
  redirectDomain: string;
}

const { mongoURI, cookieKey } = env as Keys;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
