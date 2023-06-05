import { IChat } from '../types';

export interface IChatRepository {
  createChat(chat: IChat): Promise<IChat | null>;
  getChatById(chatId: string): Promise<IChat | null>;
}
