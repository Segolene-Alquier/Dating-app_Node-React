import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSignUpForm from './signup-container';

const Signup = () => {
  const signup = success => {
    if (success) {
      window.location = '/?message=signup_success';
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstname">
          First Name
          <input
            type="text"
            name="firstname"
            onChange={handleInputChange}
            value={inputs.firstname}
            id="firstname"
            required
          />
        </label>
        <label htmlFor="surname">
          Last Name
          <input
            type="text"
            name="surname"
            id="surname"
            onChange={handleInputChange}
            value={inputs.surname}
            required
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
            value={inputs.username}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email Address
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={inputs.email}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password1">
          Password
          <input
            type="password"
            name="password1"
            id="password1"
            onChange={handleInputChange}
            value={inputs.password1}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password2">
          Re-enter Password
          <input
            type="password"
            name="password2"
            id="password2"
            onChange={handleInputChange}
            value={inputs.password2}
            required
          />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
