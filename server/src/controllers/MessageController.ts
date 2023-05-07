import { PrismaClient } from '@prisma/client';

export class MessageController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}
