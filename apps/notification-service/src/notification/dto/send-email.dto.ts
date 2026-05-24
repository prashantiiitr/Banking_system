
import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty()

  @IsEmail()

  email: string;

  @ApiProperty()

  @IsNotEmpty()

  subject: string;

  @ApiProperty()

  @IsNotEmpty()

  message: string;
}

