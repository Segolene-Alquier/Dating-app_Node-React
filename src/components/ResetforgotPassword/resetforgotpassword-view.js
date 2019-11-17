import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePasswordForm from './resetforgotpassword-container';

const ResetForgotPassword = ({ computedMatch }) => {
  const callback = success => {
    if (success) {
      window.location = '/?message=reset_password_success';
    }
  };
  const { token } = computedMatch.params;
  const { inputs, handleInputChange, handleSubmit } = usePasswordForm(
    callback,
    token,
  );
  const [validToken, setValidToken] = useState(false);
  if (!validToken) {
    axios
      .get(`http://localhost:3001/validation/forgotpassword/${token}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(data => {
        console.log(data.data.success);
        if (data.data.success) {
          setValidToken(true);
        } else {
          window.location = '/?message=user_not_validated';
        }
      });
  }
  if (validToken === true) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password1">
            password1
            <input
              type="password"
              name="password1"
              onChange={handleInputChange}
              value={inputs.password1}
              id="password1"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password2">
            password2
            <input
              type="password"
              name="password2"
              onChange={handleInputChange}
              value={inputs.password2}
              id="password2"
              required
            />
          </label>
        </div>
        <button type="submit">Change password</button>
      </form>
    );
  }
  return <h1>Chargement en cours</h1>;
};
ResetForgotPassword.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object.isRequired,
};

export default ResetForgotPassword;
