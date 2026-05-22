
import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';

import { TransferDto } from './dto/transfer.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Post('transfer')
  transfer(@Body() dto: TransferDto) {
    return this.transactionService.transfer(
      dto,
    );
  }

  @Get()
  getTransactions() {
    return this.transactionService.getTransactions();
  }
}

