import { Body, Controller, Post } from '@nestjs/common';

import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  sendOtp(@Body() body: any) {
    return this.otpService.sendOtp(body.userId, body.purpose);
  }

  @Post('verify')
  verifyOtp(@Body() body: any) {
    return this.otpService.verifyOtp(body.userId, body.otp);
  }
  @Post('resend')
  resendOtp(@Body() body: any) {
    return this.otpService.sendOtp(body.userId, body.purpose);
  }
}
