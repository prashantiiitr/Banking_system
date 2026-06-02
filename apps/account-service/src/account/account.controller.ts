import { Body, Controller, Get, Patch, Param, Post, Req } from '@nestjs/common';

import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Req() req: any, @Body() dto: CreateAccountDto) {
    return this.accountService.createAccount(
      req.user?.sub || 'temporary-user-id',
      dto,
    );
  }

  @Get()
  getAccounts(@Req() req: any) {
    return this.accountService.getAccounts(
      req.user?.sub || 'temporary-user-id',
    );
  }

  @Get(':id/statement')
  getStatement(@Param('id') id: string) {
    return this.accountService.getStatement(id);
  }
  @Patch(':id/approve')
  approve(
    @Param('id')
    id: string,
  ) {
    return this.accountService.approveAccount(id);
  }

  @Patch(':id/reject')
  reject(
    @Param('id')
    id: string,
  ) {
    return this.accountService.rejectAccount(id);
  }
}
