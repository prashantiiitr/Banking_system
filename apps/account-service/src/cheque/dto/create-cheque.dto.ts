import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateChequeDto {
  @IsString()
  accountId: string;

  @IsString()
  chequeNumber: string;

  @IsNumber()
  amount: number;

  @IsString()
  payeeName: string;
}