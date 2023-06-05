import { IMessageRepository } from '../../interfaces/repositories/IMessageRepository';
import { IMessage } from '../../interfaces/types';
import { PrismaClient } from '@prisma/client';

export class PostgresMessageRepository implements IMessageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async sendMessage(message: IMessage): Promise<IMessage | null> {
    try {
      const createdMessage = await this.prisma.message.create({
        data: {
          ...message,
        },
      });
      return createdMessage;
    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }

  async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
    try {
      return await this.prisma.message.findMany({
        where: {
          chat_id: chatId,
        },
      });
    } catch (error) {
      console.error('Error getting messages by chat id:', error);
      return null;
    }
  }
}
