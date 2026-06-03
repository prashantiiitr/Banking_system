import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChequeService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: any) {
    return this.prisma.cheque.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.cheque.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    const cheque =
      await this.prisma.cheque.findUnique({
        where: {
          id,
        },
      });

    if (!cheque) {
      throw new NotFoundException(
        'Cheque not found',
      );
    }

    return cheque;
  }

  async clearCheque(id: string) {
    return this.prisma.cheque.update({
      where: {
        id,
      },

      data: {
        status: 'CLEARED',
      },
    });
  }

  async stopCheque(id: string) {
    return this.prisma.cheque.update({
      where: {
        id,
      },

      data: {
        status: 'STOPPED',
      },
    });
  }

  async bounceCheque(id: string) {
    return this.prisma.cheque.update({
      where: {
        id,
      },

      data: {
        status: 'BOUNCED',
      },
    });
  }
}