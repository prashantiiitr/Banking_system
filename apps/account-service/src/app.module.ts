
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AccountModule } from './account/account.module';
import { NomineeModule } from './nominee/nominee.module';
import { KycModule } from './kyc/kyc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AccountModule,
    NomineeModule,
    KycModule
  ],
})
export class AppModule {}

