import { Module } from '@nestjs/common';

import { NomineeController } from './nominee.controller';

import { NomineeService } from './nominee.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [NomineeController],

  providers: [NomineeService],
})
export class NomineeModule {}