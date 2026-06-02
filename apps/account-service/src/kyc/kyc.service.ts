import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.kYC.create({
      data,
    });
  }

  getAll() {
    return this.prisma.kYC.findMany();
  }

  verify(id: string) {
    return this.prisma.kYC.update({
      where: { id },

      data: {
        status: 'VERIFIED',
      },
    });
  }
  async reject(id: string) {
    return this.prisma.kYC.update({
      where: {
        id,
      },

      data: {
        status: 'REJECTED',
      },
    });
  }
  async getPendingKyc() {
    return this.prisma.kYC.findMany({
      where: {
        status: 'PENDING',
      },
    });
  }
}
