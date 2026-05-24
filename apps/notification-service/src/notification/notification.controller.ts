
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { NotificationService } from './notification.service';

import { SendEmailDto } from './dto/send-email.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post('email')
  sendEmail(
    @Body() dto: SendEmailDto,
  ) {
    return this.notificationService.sendEmail(
      dto.email,
      dto.subject,
      dto.message,
    );
  }
}

