import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { PrismaModule } from '../prisma/prisma.module';
import { BeneficiaryModule } from '../beneficiary/ beneficiary.module';

@Module({
  imports: [PrismaModule,BeneficiaryModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}