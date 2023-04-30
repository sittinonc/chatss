import React, { createContext } from 'react';

interface IUsernameContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UsernameContext = createContext<IUsernameContext>({
  username: '',
  setUsername: (): void => {},
});
