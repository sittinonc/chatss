import React from 'react';
import { useContext } from 'react';
import { UsernameContext } from '../contexts/UsernameContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function EnterUsername() {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(UsernameContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = document.getElementById(
      'username'
    ) as HTMLInputElement;

    if (usernameInput.value !== undefined && usernameInput.value !== '') {
      setUsername(usernameInput.value as string);
      usernameInput.value = '';
    }
  };

  return (
    <div className="enter-username-page">
      {username === '' ? (
        <h1>Enter username</h1>
      ) : (
        <div className="head-box">
          <h1>Username: {username}</h1>
          <button
            className="button"
            onClick={() => {
              navigate('/chat');
            }}
          >
            Go chat
          </button>
          <button
            className="button"
            onClick={() => {
              setUsername('');
              navigate('/enter-username');
            }}
          >
            Clear username
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
