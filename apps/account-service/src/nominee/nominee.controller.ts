import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';

import { NomineeService } from './nominee.service';

@Controller('nominees')
export class NomineeController {
  constructor(private readonly nomineeService: NomineeService) {}

  @Post()
  create(@Body() dto: any) {
    return this.nomineeService.create(dto);
  }

  @Get()
  getAll() {
    return this.nomineeService.getAll();
  }
  @Delete(':id')
  delete(
    @Param('id')
    id: string,
  ) {
    return this.nomineeService.remove(id);
  }
}
