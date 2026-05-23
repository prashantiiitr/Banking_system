import { Module } from '@nestjs/common';

import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

import { PrismaModule } from '../prisma/prisma.module';

import { FraudService } from './fraud/fraud.service';

@Module({
  imports: [PrismaModule],

  controllers: [LoanController],

  providers: [
    LoanService,
    FraudService,
  ],
})
export class LoanModule {}
