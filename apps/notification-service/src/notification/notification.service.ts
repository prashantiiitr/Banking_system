
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ) {
    console.log(
      `Email sent to ${email}`,
    );

    return {
      success: true,
    };
  }
}

