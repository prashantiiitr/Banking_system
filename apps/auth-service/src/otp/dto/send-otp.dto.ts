import {
  IsEnum,
  IsString,
} from 'class-validator';

export enum OtpPurpose {
  LOGIN = 'LOGIN',
  TRANSFER = 'TRANSFER',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export class SendOtpDto {
  @IsString()
  userId: string;

  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;
}