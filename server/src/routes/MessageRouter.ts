import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';

export class MessageRouter {
  public router: Router;
  private messageController: MessageController;

  constructor(messageController: MessageController) {
    this.router = Router();
    this.messageController = messageController;
    this.initEndpoints();
  }

  private initEndpoints(): void {}
}
