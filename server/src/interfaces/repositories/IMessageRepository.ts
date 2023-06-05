import { IMessage } from '../types';

export interface IMessageRepository {
  sendMessage(message: IMessage): Promise<IMessage | null>;
  getMessagesByChatId(chatId: string): Promise<IMessage[] | null>;
}
