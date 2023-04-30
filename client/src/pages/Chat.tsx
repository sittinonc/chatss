import React, { useState, useEffect, useContext } from 'react';
import { UsernameContext } from '../contexts/UsernameContext';
import io, { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface Message {
  socketId: string;
  fromUser: string;
  message: string;
}

export default function Chat() {
  const { username } = useContext(UsernameContext);
  const [targetUsername, setTargetUsername] = useState<string>('');
  //   const [targetSocketId, setTargetSocketId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (username === '' || username === null) {
      if (confirm('You must enter a username to use this app.')) {
        navigate('/enter-username');
      } else {
        navigate('/enter-username');
      }
    }
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    newSocket.on('connect', () => {
      console.log(`Connected to server with ID ${newSocket.id}`);
      setSocket(newSocket);
    });

    newSocket.emit('register', username);

    newSocket.on('chat message', (data: Message) => {
      console.log('Received message: ', data);

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleTargetUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetUsername(event.target.value);
  };

  //   const handleTargetSocketIdChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setTargetSocketId(event.target.value);
  //   };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('chat message', {
        from: username,
        to: targetUsername,
        message,
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <h4>My username: {username}</h4>
      <h4>My socket ID: {socket?.id}</h4>
      {/* <div>
        <label htmlFor="targetUser">To: </label>
        <input
          type="text"
          id="targetUser"
          value={targetSocketId}
          placeholder="socket id"
          onChange={handleTargetSocketIdChange}
        />
      </div> */}
      <div>
        <label htmlFor="toUser">To user: </label>
        <input
          type="text"
          id="toUser"
          value={targetUsername}
          placeholder="username"
          onChange={handleTargetUsernameChange}
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
            <span>from socket ID: {message.socketId}</span>
            <span>from user: {message.fromUser}</span>
            <span>message: {message.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
