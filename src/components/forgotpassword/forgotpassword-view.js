import React from 'react';
import useForgotPasswordForm from './forgotpassword-container';

const ForgotPassword = () => {
  const forgotPassword = success => {
    if (success) {
      window.location = '/?message=forgotPassword_success';
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useForgotPasswordForm(
    forgotPassword,
  );
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default ForgotPassword;
