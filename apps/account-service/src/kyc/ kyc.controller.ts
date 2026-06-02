import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { KycService } from './kyc.service';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post()
  create(@Body() dto: any) {
    return this.kycService.create(dto);
  }

  @Get()
  getAll() {
    return this.kycService.getAll();
  }

  @Patch(':id/verify')
  verify(
    @Param('id')
    id: string,
  ) {
    return this.kycService.verify(id);
  }
  @Patch(':id/reject')
  reject(
    @Param('id')
    id: string,
  ) {
    return this.kycService.reject(id);
  }
  @Get('pending')
  getPendingKyc() {
    return this.kycService.getPendingKyc();
  }
}
