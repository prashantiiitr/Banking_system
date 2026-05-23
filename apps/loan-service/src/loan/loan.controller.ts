import {
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';

import { LoanService } from './loan.service';

import { ApplyLoanDto } from './dto/apply-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(
    private readonly loanService: LoanService,
  ) {}

  @Post('apply')
  applyLoan(
    @Req() req: any,

    @Body() dto: ApplyLoanDto,
  ) {
    return this.loanService.applyLoan(
      req.user?.sub ||
        'temporary-user-id',

      dto,
    );
  }

  @Get()
  getLoans(@Req() req: any) {
    return this.loanService.getLoans(
      req.user?.sub ||
        'temporary-user-id',
    );
  }
}

