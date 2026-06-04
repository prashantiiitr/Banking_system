import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createLog(
    action: string,
    entityId: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        action,
        entityId,
      },
    });
  }
}