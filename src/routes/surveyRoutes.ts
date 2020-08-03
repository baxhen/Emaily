import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import { Path } from 'path-parser';
import { URL } from 'url';

import { requireLogin } from '../middlewares/requireLogin';
import { requireCredits } from '../middlewares/requireCredits';
import { Mailer } from '../services/Mailer';
import { surveyTemplate } from '../services/emailTemplates/surveyTemplate';
import { User } from '../interfaces';

interface Survey {
  subject: string;
  recipients: { email: string }[];
  save(): void;
}

export interface SendGridResponse {
  email: string;
  event: string;
  url: string;
}

export const surveyRoutes = express.Router();
const Survey = mongoose.model('surveys');

surveyRoutes.get(
  '/api/surveys/:surveyId/:choice',
  (req: Request, res: Response) => {
    res.send('Thanks for voting');
  }
);

surveyRoutes.post(
  '/api/surveys',
  requireLogin,
  requireCredits,
  async (req: Request, res: Response) => {
    const { title, subject, body, recipients } = req.body;
    const { _id } = req.user as User;

    const survey = (new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email: string) => ({ email: email.trim() })),
      _user: _id,
      dateSent: Date.now(),
    }) as any) as Survey;

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      const _user = req.user as User;
      _user.credits -= 1;
      const user = await _user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  }
);

surveyRoutes.post('/api/surveys/webhooks', (req: Request, res: Response) => {
  const response = req.body as SendGridResponse[];
  const p = new Path('/api/surveys/:surveyId/:choice');
  _.chain(response)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { surveyId: match.surveyId, choice: match.choice, email };
      }
    })
    .compact()
    .uniqBy(['email', 'surveyId'])
    .each(({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: { $elemMatch: { email: email, responded: false } },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

surveyRoutes.get(
  '/api/surveys',
  requireLogin,
  async (req: Request, res: Response) => {
    const user = req.user as User;
    const surveys = await Survey.find({ _user: user._id }).select({
      recipients: 0,
    });
    res.send(surveys);
  }
);
