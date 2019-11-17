// import { toast } from 'react-toastify';
// import _ from 'lodash';
import {
  loginSuccess,
  logoutSuccess,
  signupSuccess,
  alreadyLoggedin,
  userValidated,
  userNotValidated,
  forgotPasswordSuccess,
} from './toaster-container';

const Toaster = ({ getParams }) => {
  if (getParams !== undefined && getParams.message !== undefined) {
    switch (getParams.message) {
      case 'login_success':
        loginSuccess();
        break;
      case 'logout_success':
        logoutSuccess();
        break;
      case 'signup_success':
        signupSuccess();
        break;
      case 'already_loggedin':
        alreadyLoggedin();
        break;
      case 'user_validated':
        userValidated();
        break;
      case 'user_not_validated':
        userNotValidated();
        break;
      case 'forgotPassword_success':
        forgotPasswordSuccess();
        break;
      default:
        break;
    }
  }
  return null;
};

export default Toaster;
