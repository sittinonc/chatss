import express, { Express } from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

interface User {
  id: string;
  socket: Socket;
  username?: string;
}

const app: Express = express();
const http: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users: User[] = [];

io.on('connection', (socket: Socket) => {
  console.log(`Socket ${socket.id} connected`);

  const user: User = { id: socket.id, socket };
  users.push(user);

  socket.on('register', (username: string) => {
    user.username = username;
    users.push(user);
    console.log('All users: ', users);
  });

  socket.on(
    'chat message',
    (data: { from: string; to: string; message: string }) => {
      const targetUser: User | undefined = users.find(
        (user) => user.username === data.to
      );

      if (targetUser) {
        targetUser.socket.emit('chat message', {
          socketId: socket.id,
          fromUser: data.from,
          message: data.message,
        });
      }
    }
  );

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);

    const index: number = users.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
http.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
