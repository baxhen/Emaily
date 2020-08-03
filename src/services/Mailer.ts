import sendgrid from 'sendgrid';

import * as env from '../config/keys';
import { Keys } from '../server';
import e from 'express';
const helper = sendgrid.mail;
const { Email } = helper;

interface Recipient {
  email: string;
}

interface SerializedRecipient {
  email: any;
  name: string;
}

const { sendGridKey } = env as Keys;

export class Mailer extends helper.Mail {
  recipients: SerializedRecipient[];
  body: any;
  sgApi: any;
  constructor(
    public email: { subject: string; recipients: Recipient[] },
    public content: string
  ) {
    super();

    this.sgApi = sendgrid(sendGridKey);

    this.setFrom(new helper.Email('leo292629@gmail.com'));
    this.setSubject(email.subject);
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(email.recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients: Recipient[]) {
    return recipients.map((recipient: Recipient) => {
      return new helper.Email(recipient.email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);

    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    let response = await this.sgApi.API(request);

    return response;
  }
}
