import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import './index.css';

interface Message {
  from: string;
  message: string;
}

const App = () => {
  const [message, setMessage] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the server
    const newSocket = io('http://localhost:3000');
    newSocket.on('connect', () => {
      console.log(`Connected to server with ID ${newSocket.id}`);
      setSocket(newSocket);
    });

    // Receive chat messages from the server
    newSocket.on('chat message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Disconnect from the server when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleTargetUserChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetUser(event.target.value);
  };

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('chat message', { to: targetUser, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <h4>My socket ID: {socket?.id}</h4>
      <div>
        <label htmlFor="targetUser">To: </label>
        <input
          type="text"
          id="targetUser"
          value={targetUser}
          placeholder="socket id"
          onChange={handleTargetUserChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message: </label>
        <input
          type="text"
          id="message"
          value={message}
          placeholder="hello world"
          onChange={handleMessageChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div className="message-box" key={index}>
            <span>from socket ID: {message.from}</span>
            <span>message: {message.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
