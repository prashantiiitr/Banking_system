import { IsString } from 'class-validator';

export class CreateNomineeDto {
  @IsString()
  accountId: string;

  @IsString()
  name: string;

  @IsString()
  relation: string;

  @IsString()
  phone: string;
}