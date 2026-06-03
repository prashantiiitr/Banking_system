
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AccountModule } from './account/account.module';
import { NomineeModule } from './nominee/nominee.module';
import { KycModule } from './kyc/kyc.module';
import { ChequeModule } from './cheque/cheque.module';
import { FraudModule } from './fraud/fraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AccountModule,
    NomineeModule,
    KycModule,
    ChequeModule,
    FraudModule
  ],
})
export class AppModule {}

