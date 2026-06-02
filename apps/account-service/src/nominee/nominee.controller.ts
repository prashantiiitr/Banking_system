import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { NomineeService } from './nominee.service';

@Controller('nominees')
export class NomineeController {
  constructor(
    private readonly nomineeService: NomineeService,
  ) {}

  @Post()
  create(
    @Body() dto: any,
  ) {
    return this.nomineeService.create(
      dto,
    );
  }

  @Get()
  getAll() {
    return this.nomineeService.getAll();
  }
}