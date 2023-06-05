import { IChatRepository } from '../interfaces/repositories/IChatRepository';
import { IChat } from '../interfaces/types';

export class ChatManager {
  public chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async createChat(chat: IChat): Promise<IChat | null> {
    return await this.chatRepository.createChat(chat);
  }

  async getChatById(chat_id: string): Promise<IChat | null> {
    return await this.chatRepository.getChatById(chat_id);
  }
}
