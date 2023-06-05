import { Request, Response } from 'express';
import { IMessage } from '../interfaces/types';
import { MessageManager } from '../managers/MessageManager';

export class MessageController {
  private messageManager: MessageManager;

  constructor(messageManager: MessageManager) {
    this.messageManager = messageManager;
  }

  public sendMessage = async (req: Request, res: Response): Promise<void> => {
    const message: IMessage = req.body;
    console.log('Sending message:', message);

    const sentMessage = await this.messageManager.sendMessage(message);
    if (sentMessage) {
      res.status(201).json(sentMessage);
    } else {
      res.status(500).json({ error: 'Unable to send message' });
    }
  };
}
