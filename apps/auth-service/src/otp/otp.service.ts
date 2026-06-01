import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  private generateOtp() {
    return Math.floor(
      100000 +
        Math.random() * 900000,
    ).toString();
  }

  async sendOtp(
  userId: string,
  purpose: string,
) {
  const user =
    await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new BadRequestException(
      'User not found',
    );
  }

  const otp =
    this.generateOtp();

  const expiresAt =
    new Date(
      Date.now() +
        5 * 60 * 1000,
    );

  await this.prisma.otpVerification.create({
    data: {
      userId,

      otp,

      purpose: purpose as any,

      expiresAt,
    },
  });

  await this.mailService.sendOtpEmail(
    user.email,
    otp,
  );

  return {
    message:
      'OTP sent successfully',
  };
}

  async verifyOtp(
    userId: string,
    otp: string,
  ) {
    const record =
      await this.prisma.otpVerification.findFirst({
        where: {
          userId,
          otp,
          verified: false,
        },
      });

    if (!record) {
      throw new BadRequestException(
        'Invalid OTP',
      );
    }

    if (
      record.expiresAt <
      new Date()
    ) {
      throw new BadRequestException(
        'OTP expired',
      );
    }

    await this.prisma.otpVerification.update({
      where: {
        id: record.id,
      },

      data: {
        verified: true,
      },
    });

    return {
      message:
        'OTP verified successfully',
    };
  }
}