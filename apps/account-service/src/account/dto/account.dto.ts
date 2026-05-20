import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT',
}

export class CreateAccountDto {
  @ApiProperty()
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty()
  @IsString()
  currency: string;
}