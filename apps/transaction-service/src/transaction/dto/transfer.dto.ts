import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TransferType {
  IMPS = 'IMPS',
  NEFT = 'NEFT',
  RTGS = 'RTGS',
}

export class TransferDto {
  @IsString()
  fromAccountId: string;

  @IsString()
  toAccountId: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransferType)
  transferType: TransferType;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsString()
  description?: string;
}