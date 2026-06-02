import { Module } from '@nestjs/common';

import { KycController } from '../kyc/ kyc.controller';

import { KycService } from './kyc.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [KycController],

  providers: [KycService],
})
export class KycModule {}