import dotenv from 'dotenv';
import { UserController } from './controllers/UserController';
import { ChatController } from './controllers/ChatController';
import { MessageController } from './controllers/MessageController';
import { db } from './db';

dotenv.config();

import { Server } from './server/serverclass';

const server: Server = new Server(
  new UserController(db),
  new ChatController(db),
  new MessageController(db)
);
server.start(
  process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000
);
