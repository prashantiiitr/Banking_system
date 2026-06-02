import {
  IsString,
} from 'class-validator';

export class CreateKycDto {
  @IsString()
  userId: string;

  @IsString()
  panNumber: string;

  @IsString()
  aadhaar: string;

  @IsString()
  address: string;
}