import React, { useState } from 'react';
import useSignUpForm from './signup-container';
import { Redirect } from 'react-router-dom';

const Signup = () => {
  const [redirect, setRedirect] = useState(false);
  const signup = success => {
    setRedirect(success);
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);
  if (!redirect) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            onChange={handleInputChange}
            value={inputs.firstname}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            name="surname"
            onChange={handleInputChange}
            value={inputs.surname}
            required
          />
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
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password1"
            onChange={handleInputChange}
            value={inputs.password1}
            required
          />
        </div>
        <div>
          <label>Re-enter Password</label>
          <input
            type="password"
            name="password2"
            onChange={handleInputChange}
            value={inputs.password2}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            toasterType: 'success',
            toasterMessage: 'Your account was successfully created!',
          },
        }}
      />
    );
  }
};

export default Signup;
