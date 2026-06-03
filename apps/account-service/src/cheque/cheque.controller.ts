import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ChequeService } from './cheque.service';
import { CreateChequeDto } from './dto/create-cheque.dto';

@Controller('cheques')
export class ChequeController {
  constructor(
    private readonly chequeService: ChequeService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateChequeDto,
  ) {
    return this.chequeService.create(
      dto,
    );
  }

  @Get()
  getAll() {
    return this.chequeService.getAll();
  }

  @Get(':id')
  getById(
    @Param('id')
    id: string,
  ) {
    return this.chequeService.getById(
      id,
    );
  }

  @Patch(':id/clear')
  clearCheque(
    @Param('id')
    id: string,
  ) {
    return this.chequeService.clearCheque(
      id,
    );
  }

  @Patch(':id/stop')
  stopCheque(
    @Param('id')
    id: string,
  ) {
    return this.chequeService.stopCheque(
      id,
    );
  }

  @Patch(':id/bounce')
  bounceCheque(
    @Param('id')
    id: string,
  ) {
    return this.chequeService.bounceCheque(
      id,
    );
  }
}