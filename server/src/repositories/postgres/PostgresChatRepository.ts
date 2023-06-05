import { IChatRepository } from '../../interfaces/repositories/IChatRepository';
import { IChat } from '../../interfaces/types';
import { PrismaClient } from '@prisma/client';

export class PostgresChatRepository implements IChatRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createChat(chat: IChat): Promise<IChat | null> {
    try {
      const createdChat = await this.prisma.chat.create({
        data: {
          ...chat,
        },
      });
      return createdChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  }

  async getChatById(chatId: string): Promise<IChat | null> {
    try {
      return await this.prisma.chat.findUnique({
        where: {
          chat_id: chatId,
        },
      });
    } catch (error) {
      console.error('Error getting chat by id:', error);
      return null;
    }
  }
}
