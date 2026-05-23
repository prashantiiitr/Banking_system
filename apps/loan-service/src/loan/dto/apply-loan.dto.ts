import {
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ApplyLoanDto {
  @ApiProperty()

  @IsNumber()

  @Min(1000)

  amount: number;

  @ApiProperty()

  @IsNumber()

  interestRate: number;

  @ApiProperty()

  @IsInt()

  tenureMonths: number;
}

