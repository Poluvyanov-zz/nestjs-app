import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EmailService } from '../services/email.service';
import { APP_DOMAIN } from '../../app.constants';

@Injectable()
export class EventsService extends EventEmitter2 {
  constructor(private readonly mailService: EmailService) {
    super();
  }

  @OnEvent('user.registered', { async: true })
  handleUserCreatedEvent(payload) {
    console.log('payload!!!!!!', payload);
    const data = {
      verificationLink: `${APP_DOMAIN}/graphql?query={verifyEmail(token:"${payload.email_token}")}`,
      email: payload.email,
    };
    this.mailService.confirmEmailSend(data);
  }
}
