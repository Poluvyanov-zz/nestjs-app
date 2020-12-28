import { Injectable } from '@nestjs/common';
import mailgun from 'mailgun-js';
import {
  CLIENT_EMAIL,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
} from '../../app.constants';

@Injectable()
export class EmailService {
  mailgunClient;

  constructor() {
    this.mailgunClient = new mailgun({
      apiKey: MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN,
    });
  }

  private async send(payload): Promise<void> {
    this.mailgunClient.messages().send(
      payload,
      (error, body) => {
        console.log(body);
      },
      (error) => {
        console.log('Sending error: ', error.message);
      },
    );
  }

  public async confirmEmailSend(payload) {
    const data = {
      from: CLIENT_EMAIL,
      to: payload.email,
      subject: 'Confirm email',
      template: 'email_confirm',
      'v:verificationLink': payload.verificationLink,
    };

    this.send(data);
  }
}
