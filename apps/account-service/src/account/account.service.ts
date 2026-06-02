import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  async createAccount(userId: string, data: any) {
    const account = await this.prisma.account.create({
      data: {
        accountNumber: this.generateAccountNumber(),

        type: data.type,

        currency: data.currency,

        userId,

        balance: 0,
      },
    });

    return {
      message: 'Account created successfully',

      account,
    };
  }

  async getAccounts(userId: string) {
    return this.prisma.account.findMany({
      where: {
        userId,
      },
    });
  }

  async getStatement(accountId: string) {
    return this.prisma.ledgerEntry.findMany({
      where: {
        accountId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async approveAccount(id: string) {
    return this.prisma.account.update({
      where: {
        id,
      },

      data: {
        status: 'ACTIVE',
      },
    });
  }

  async rejectAccount(id: string) {
    return this.prisma.account.update({
      where: {
        id,
      },

      data: {
        status: 'REJECTED',
      },
    });
  }
  async getPendingAccounts() {
  return this.prisma.account.findMany({
    where: {
      status: 'PENDING',
    },
  });
}
}
