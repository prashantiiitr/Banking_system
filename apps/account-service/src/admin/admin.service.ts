import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async stats() {
    const users =
      await this.prisma.user.count();

    const accounts =
      await this.prisma.account.count();

    const loans =
      await this.prisma.loan.count();

    const transactions =
      await this.prisma.transaction.count();

    const fraudAlerts =
      await this.prisma.fraudAlert.count({
        where: {
          resolved: false,
        },
      });

    return {
      users,
      accounts,
      loans,
      transactions,
      fraudAlerts,
    };
  }
}