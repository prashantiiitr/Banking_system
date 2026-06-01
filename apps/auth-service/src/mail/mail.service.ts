import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,

    port: Number(process.env.MAIL_PORT),

    secure: false,

    auth: {
      user: process.env.MAIL_USER,

      pass: process.env.MAIL_PASS,
    },
  });

  async sendOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,

      to: email,

      subject: 'Your Banking OTP',

      html: `
      <h2>Banking OTP Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes.</p>
      `,
    });
  }
  async sendLoginOtp(email: string, otp: string) {
    return this.sendOtpEmail(email, otp);
  }

  async sendTransferOtp(email: string, otp: string) {
    return this.sendOtpEmail(email, otp);
  }

  async sendPasswordResetOtp(email: string, otp: string) {
    return this.sendOtpEmail(email, otp);
  }
}
