import { Injectable } from '@nestjs/common';

@Injectable()
export class FraudService {
  checkFraud(amount: number) {
    let fraudScore = 0;

    if (amount > 500000) {
      fraudScore += 70;
    }

    if (amount > 800000) {
      fraudScore += 90;
    }

    return {
      fraudScore,

      suspicious:
        fraudScore >= 70,
    };
  }
}

