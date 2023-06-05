import { Request, Response } from 'express';
import { IChat } from '../interfaces/types';
import { ChatManager } from '../managers/ChatManager';
import { ParticipantManager } from '../managers/ParticipantManager';
import { MessageManager } from '../managers/MessageManager';

export class ChatController {
  private chatManager: ChatManager;
  private participantManager: ParticipantManager;
  private messageManager: MessageManager;
  constructor(
    chatManager: ChatManager,
    participantManager: ParticipantManager,
    messageManager: MessageManager
  ) {
    this.chatManager = chatManager;
    this.participantManager = participantManager;
    this.messageManager = messageManager;
  }

  public createChat = async (req: Request, res: Response): Promise<void> => {
    const createChatData: IChat = req.body;

    const { useraid, userbid } = req.params;
    console.log('Creating chat:', createChatData, useraid, userbid);

    // create chat
    const createdChat = await this.chatManager.createChat({
      name: createChatData.name,
    });

    if (createdChat && createdChat.chat_id && useraid && userbid) {
      // create participants
      const participantA = await this.participantManager.createParticipant({
        chat_id: createdChat.chat_id,
        user_id: useraid,
      });
      const participantB = await this.participantManager.createParticipant({
        chat_id: createdChat.chat_id,
        user_id: userbid,
      });

      res.status(201).json({ createdChat, participantA, participantB });
    } else {
      res.status(500).json({ error: 'Unable to create chat' });
    }
  };

  public getChatById = async (req: Request, res: Response): Promise<void> => {
    const chatId = req.params.chatid;
    console.log('Getting chat by id:', chatId);

    const chat = await this.chatManager.getChatById(chatId);
    const messages = await this.messageManager.getMessagesByChatId(chatId);

    if (chat) {
      res.status(200).json({ chat, messages });
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  };
}
