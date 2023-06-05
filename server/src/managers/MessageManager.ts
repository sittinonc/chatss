import { IMessageRepository } from '../interfaces/repositories/IMessageRepository';
import { IMessage } from '../interfaces/types';

export class MessageManager {
  public messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async sendMessage(message: IMessage): Promise<IMessage | null> {
    return await this.messageRepository.sendMessage(message);
  }

  async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
    return await this.messageRepository.getMessagesByChatId(chatId);
  }
}
