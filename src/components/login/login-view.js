import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useLoginForm from './login-container';

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const login = success => {
    setRedirect(success);
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(login);

  if (!redirect) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              value={inputs.username}
              id="username"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              id="password"
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/',
        state: {
          toasterType: 'success',
          toasterMessage: 'You successfully logged in!',
        },
      }}
    />
  );
};

export default Login;
