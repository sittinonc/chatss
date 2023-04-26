import express, { Express } from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

interface User {
  id: string;
  socket: Socket;
}

const app: Express = express();
const http: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(http, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
  },
});

const connectedUsers: User[] = [];

io.on('connection', (socket: Socket) => {
  console.log(`Socket ${socket.id} connected`);

  const user: User = { id: socket.id, socket };
  connectedUsers.push(user);

  socket.on('chat message', (data: { to: string; message: string }) => {
    const targetUser: User | undefined = connectedUsers.find(
      (user) => user.id === data.to
    );
    if (targetUser) {
      targetUser.socket.emit('chat message', {
        from: socket.id,
        message: data.message,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);

    const index: number = connectedUsers.findIndex(
      (user) => user.socket === socket
    );
    if (index !== -1) {
      connectedUsers.splice(index, 1);
    }
  });
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
http.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
