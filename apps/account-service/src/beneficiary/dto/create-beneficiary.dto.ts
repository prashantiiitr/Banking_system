
import {
  IsNotEmpty,
} from 'class-validator';

export class CreateBeneficiaryDto {
  @IsNotEmpty()

  name: string;

  @IsNotEmpty()

  bankName: string;

  @IsNotEmpty()

  accountNumber: string;

  @IsNotEmpty()

  ifscCode: string;
}

