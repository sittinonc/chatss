import dotenv from 'dotenv';
import { UserController } from './controllers/UserController';
import { ChatController } from './controllers/ChatController';
import { MessageController } from './controllers/MessageController';
import { db } from './db';
import { Server } from './server/server';
import { PostgresUserRepository } from './repositories/postgres/PostgresUserRepository';
import { PostgresChatRepository } from './repositories/postgres/PostgresChatRepository';
import { PostgresMessageRepository } from './repositories/postgres/PostgresMessageRepository';
import { PosgresParticipantRepository } from './repositories/postgres/PostgresParticipantRepository';
import { UserManager } from './managers/UserManager';
import { ChatManager } from './managers/ChatManager';
import { MessageManager } from './managers/MessageManager';
import { ParticipantManager } from './managers/ParticipantManager';

dotenv.config();

const userRepository: PostgresUserRepository = new PostgresUserRepository(db);
const chatRepository: PostgresChatRepository = new PostgresChatRepository(db);
const messageRepository: PostgresMessageRepository =
  new PostgresMessageRepository(db);
const participantRepository: PosgresParticipantRepository =
  new PosgresParticipantRepository(db);
const userManager: UserManager = new UserManager(userRepository);
const chatManager: ChatManager = new ChatManager(chatRepository);
const messageManager: MessageManager = new MessageManager(messageRepository);
const participantManager: ParticipantManager = new ParticipantManager(
  participantRepository
);

const server: Server = new Server(
  new UserController(userManager),
  new ChatController(chatManager, participantManager, messageManager),
  new MessageController(messageManager)
);
server.start(
  process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000
);
