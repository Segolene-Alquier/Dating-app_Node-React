import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useLoginForm from './login-container';

const Login = () => {
  const login = success => {
    if (success) {
      window.location = '/?message=login_success';
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(login);

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
};

export default Login;
