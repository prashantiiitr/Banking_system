import { Module } from '@nestjs/common';

import { ChequeController } from './cheque.controller';

import { ChequeService } from './cheque.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [ChequeController],

  providers: [ChequeService],
})
export class ChequeModule {}