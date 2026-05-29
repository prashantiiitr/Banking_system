
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { BeneficiaryService } from './beneficiary.service';

import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';

@Controller('beneficiaries')
export class BeneficiaryController {
  constructor(
    private readonly beneficiaryService: BeneficiaryService,
  ) {}

  @Post()
  create(
    @Req() req: any,

    @Body()
    dto: CreateBeneficiaryDto,
  ) {
    return this.beneficiaryService.create(
      req.user?.sub ||
        'temporary-user-id',

      dto,
    );
  }

  @Get()
  findAll(@Req() req: any) {
    return this.beneficiaryService.findAll(
      req.user?.sub ||
        'temporary-user-id',
    );
  }

  @Patch(':id/approve')
  approve(
    @Param('id') id: string,
  ) {
    return this.beneficiaryService.approve(
      id,
    );
  }
}

