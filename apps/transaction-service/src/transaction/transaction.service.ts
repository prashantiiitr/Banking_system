
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { randomUUID } from 'crypto';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async transfer(data: any) {
    const sender =
      await this.prisma.account.findUnique({
        where: {
          id: data.fromAccountId,
        },
      });

    const receiver =
      await this.prisma.account.findUnique({
        where: {
          id: data.toAccountId,
        },
      });

    if (!sender || !receiver) {
      throw new BadRequestException(
        'Invalid accounts',
      );
    }

    if (sender.balance < data.amount) {
      throw new BadRequestException(
        'Insufficient balance',
      );
    }

    const transaction =
      await this.prisma.transaction.create({
        data: {
          fromAccountId:
            data.fromAccountId,

          toAccountId:
            data.toAccountId,

          amount: data.amount,

          description:
            data.description,

          idempotencyKey:
            randomUUID(),

          status: 'PROCESSING',
        },
      });

    try {
      await this.prisma.$transaction([
        this.prisma.account.update({
          where: {
            id: sender.id,
          },

          data: {
            balance: {
              decrement: data.amount,
            },
          },
        }),

        this.prisma.account.update({
          where: {
            id: receiver.id,
          },

          data: {
            balance: {
              increment: data.amount,
            },
          },
        }),

        this.prisma.ledgerEntry.create({
          data: {
            accountId: sender.id,

            amount: data.amount,

            type: 'DEBIT',

            description:
              data.description,
          },
        }),

        this.prisma.ledgerEntry.create({
          data: {
            accountId: receiver.id,

            amount: data.amount,

            type: 'CREDIT',

            description:
              data.description,
          },
        }),
      ]);

      await this.prisma.transaction.update({
        where: {
          id: transaction.id,
        },

        data: {
          status: 'COMPLETED',
        },
      });

      return {
        message:
          'Transfer successful',

        transactionId:
          transaction.id,
      };
    } catch (error) {
      await this.prisma.transaction.update({
        where: {
          id: transaction.id,
        },

        data: {
          status: 'FAILED',
        },
      });

      throw new BadRequestException(
        'Transaction failed',
      );
    }
  }

  async getTransactions() {
    return this.prisma.transaction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

