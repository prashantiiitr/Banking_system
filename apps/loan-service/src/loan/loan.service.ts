import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
    const monthlyRate = annualRate / 12 / 100;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    return Number(emi.toFixed(2));
  }

  async applyLoan(userId: string, data: any) {
    if (data.amount > 1000000) {
      throw new BadRequestException('Loan amount exceeds limit');
    }

    const emi = this.calculateEMI(
      data.amount,
      data.interestRate,
      data.tenureMonths,
    );

    const loan = await this.prisma.loan.create({
      data: {
        userId,

        amount: data.amount,

        interestRate: data.interestRate,

        tenureMonths: data.tenureMonths,

        monthlyEmi: emi,

        remainingAmount: data.amount,

        status: 'APPROVED',
      },
    });

    return {
      message: 'Loan approved successfully',

      monthlyEmi: emi,

      loan,
    };
  }

  async getLoans(userId: string) {
    return this.prisma.loan.findMany({
      where: {
        userId,
      },
    });
  }
  async approveLoan(id: string, managerId: string) {
    return this.prisma.loan.update({
      where: { id },

      data: {
        status: 'ACTIVE',

        approvedAt: new Date(),

        approvedBy: managerId,

        nextEmiDate: new Date(),
      },
    });
  }
  async rejectLoan(id: string) {
    return this.prisma.loan.update({
      where: { id },

      data: {
        status: 'REJECTED',
      },
    });
  }
}
