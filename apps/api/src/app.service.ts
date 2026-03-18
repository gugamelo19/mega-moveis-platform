import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    const userCount = await this.prisma.user.count();

    return {
      status: 'ok',
      service: 'mega-moveis-api',
      database: 'connected',
      timestamp: new Date().toISOString(),
      userCount,
    };
  }
}
