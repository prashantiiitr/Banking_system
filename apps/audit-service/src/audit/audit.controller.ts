
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(
    private readonly auditService: AuditService,
  ) {}

  @Post()
  createLog(@Body() body: any) {
    return this.auditService.createLog(
      body,
    );
  }
}

