
import {
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()

  @IsString()

  fromAccountId: string;

  @ApiProperty()

  @IsString()

  toAccountId: string;

  @ApiProperty()

  @IsNumber()

  @Min(1)

  amount: number;

  @ApiProperty()

  @IsString()

  description: string;
}

