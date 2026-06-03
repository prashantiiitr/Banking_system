import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { FraudService } from './fraud.service';

@Controller('fraud-alerts')
export class FraudController {
  constructor(
    private readonly fraudService: FraudService,
  ) {}

  @Get()
  getAll() {
    return this.fraudService.getAllAlerts();
  }

  @Post()
  create(
    @Body() body: any,
  ) {
    return this.fraudService.createAlert(
      body.accountId,
      body.reason,
    );
  }

  @Patch(':id/resolve')
  resolve(
    @Param('id')
    id: string,
  ) {
    return this.fraudService.resolveAlert(
      id,
    );
  }
}