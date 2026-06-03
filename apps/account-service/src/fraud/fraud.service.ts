import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FraudService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getAllAlerts() {
    return this.prisma.fraudAlert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  resolveAlert(id: string) {
    return this.prisma.fraudAlert.update({
      where: {
        id,
      },

      data: {
        resolved: true,
      },
    });
  }

  createAlert(
    accountId: string,
    reason: string,
  ) {
    return this.prisma.fraudAlert.create({
      data: {
        accountId,
        reason,
      },
    });
  }
}