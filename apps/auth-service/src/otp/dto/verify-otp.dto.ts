import {
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  userId: string;

  @IsString()
  otp: string;
}