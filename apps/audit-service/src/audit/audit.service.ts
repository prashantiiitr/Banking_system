
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  async createLog(data: any) {
    console.log(
      'Audit Log:',
      data,
    );

    return {
      success: true,
    };
  }
}

