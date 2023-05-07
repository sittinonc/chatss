import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

export class ChatRouter {
  public router: Router;
  private chatController: ChatController;

  constructor(userController: ChatController) {
    this.router = Router();
    this.chatController = userController;
    this.initEndpoints();
  }

  private initEndpoints(): void {}
}
