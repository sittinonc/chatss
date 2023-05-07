import { PrismaClient } from '@prisma/client';

export class ChatController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}
