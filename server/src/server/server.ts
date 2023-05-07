import express, { Express, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRouter } from '../routes/UserRouter';
import { ChatRouter } from '../routes/ChatRouter';
import { MessageRouter } from '../routes/MessageRouter';
import { UserController } from '../controllers/UserController';
import { ChatController } from '../controllers/ChatController';
import { MessageController } from '../controllers/MessageController';

export class Server {
  private app: Express;
  private userRouter: Router;
  private chatRouter: Router;
  private messageRouter: Router;

  constructor(
    userController: UserController,
    chatController: ChatController,
    messageController: MessageController
  ) {
    this.app = express();
    this.initControllers(userController, chatController, messageController);
    this.initRoutes();
  }

  private initControllers(
    userController: UserController,
    chatController: ChatController,
    messageController: MessageController
  ): void {
    this.userRouter = new UserRouter(userController).router;
    this.chatRouter = new ChatRouter(chatController).router;
    this.messageRouter = new MessageRouter(messageController).router;
  }

  private initRoutes(): void {
    this.app.use('/api/user', this.userRouter);
    this.app.use('/api/chat', this.chatRouter);
    this.app.use('/api/message', this.messageRouter);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
