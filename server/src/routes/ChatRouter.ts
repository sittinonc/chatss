import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';
const bodyParser = require('body-parser');

export class ChatRouter {
  public router: Router;
  private chatController: ChatController;

  constructor(userController: ChatController) {
    this.router = Router();
    this.chatController = userController;
    this.initEndpoints();
  }

  private initEndpoints(): void {
    this.router.get(
      '/:chatid',
      bodyParser.json(),
      this.chatController.getChatById
    );
    this.router.post(
      '/create/:useraid/:userbid',
      bodyParser.json(),
      this.chatController.createChat
    );
  }
}
