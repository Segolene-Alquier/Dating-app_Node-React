import React, { useState } from 'react';
import useLoginForm from './login-container';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const login = success => {
    setRedirect(success)
  };
    const { inputs, handleInputChange, handleSubmit } = useLoginForm(login);

    if (!redirect) {
      return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            value={inputs.username}
            required
            />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
            required
            />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  }
  else {
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
  }
};

export default Login;
