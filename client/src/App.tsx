import { useState } from 'react';
import { UsernameContext } from './contexts/UsernameContext.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat.tsx';
import EnterUsername from './pages/EnterUsername.tsx';
import Error from './pages/Error.tsx';

const App = () => {
  const [username, setUsername] = useState<string>('');
  return (
    <UsernameContext.Provider
      value={{ username: username, setUsername: setUsername }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnterUsername />} />
          <Route path="/enter-username" element={<EnterUsername />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UsernameContext.Provider>
  );
};

export default App;
