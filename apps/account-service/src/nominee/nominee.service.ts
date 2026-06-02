import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NomineeService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.nominee.create({
      data,
    });
  }

  getAll() {
    return this.prisma.nominee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async remove(id: string) {
    return this.prisma.nominee.delete({
      where: {
        id,
      },
    });
  }
}
