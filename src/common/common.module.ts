import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { EventsService } from './events/events.service';

@Module({
  imports: [],
  providers: [EmailService, EventsService],
  exports: [EmailService, EventsService],
})
export class CommonModule {}
