import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { randomUUID } from 'crypto';

import { TransferType } from './dto/transfer.dto';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
  ) {}

  private validateTransfer(
    amount: number,
    transferType: TransferType,
  ) {
    if (
      transferType === TransferType.IMPS &&
      amount > 500000
    ) {
      throw new BadRequestException(
        'IMPS limit exceeded (5 lakh)',
      );
    }

    if (
      transferType === TransferType.RTGS &&
      amount < 200000
    ) {
      throw new BadRequestException(
        'RTGS minimum amount is ₹2 lakh',
      );
    }
  }

  private generateReference() {
    return (
      'TXN' +
      Date.now() +
      Math.floor(
        Math.random() * 1000,
      )
    );
  }

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

    this.validateTransfer(
      data.amount,
      data.transferType,
    );

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

          transferType:
            data.transferType,

          remarks: data.remarks,

          referenceNumber:
            this.generateReference(),

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

        referenceNumber:
          transaction.referenceNumber,
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