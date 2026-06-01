import { Module } from '@nestjs/common';

import { OtpController } from './otp.controller';

import { OtpService } from './otp.service';

import { PrismaModule } from '../prisma/prisma.module';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule,MailModule],

  controllers: [OtpController],

  providers: [OtpService],
})
export class OtpModule {}