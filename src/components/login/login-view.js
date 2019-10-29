import React from 'react';
import useLoginForm from './login-container';

const Login = () => {
  const login = () => {
    // console.log('User Logged!');
  }
  const {inputs, handleInputChange, handleSubmit} = useLoginForm(login);
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={handleInputChange} value={inputs.username} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleInputChange} value={inputs.password} required/>
        </div>
        <button type="submit">Log In</button>
      </form>
    );
}

export default Login;
