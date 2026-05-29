
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BeneficiaryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    data: any,
  ) {
    return this.prisma.beneficiary.create({
      data: {
        userId,

        ...data,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.beneficiary.findMany({
      where: {
        userId,
      },
    });
  }

  async approve(id: string) {
    return this.prisma.beneficiary.update({
      where: { id },

      data: {
        isApproved: true,
      },
    });
  }
}

