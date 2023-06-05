import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';
const bodyParser = require('body-parser');

export class MessageRouter {
  public router: Router;
  private messageController: MessageController;

  constructor(messageController: MessageController) {
    this.router = Router();
    this.messageController = messageController;
    this.initEndpoints();
  }

  private initEndpoints(): void {
    this.router.post(
      '/send',
      bodyParser.json(),
      this.messageController.sendMessage
    );
  }
}
