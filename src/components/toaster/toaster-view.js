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
  resetPasswordSuccess,
  deleteSuccess,
  userNotFound,
  profileNotCompleted,
  userBlockedYou,
  accessDenied,
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
      case 'delete_success':
        deleteSuccess();
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
      case 'reset_password_success':
        resetPasswordSuccess();
        break;
      case 'user_not_found':
        userNotFound();
        break;
      case 'profile_not_completed':
        profileNotCompleted();
        break;
      case 'user_blocked_you':
        userBlockedYou();
        break;
      case 'access_denied':
        accessDenied();
        break;
      default:
        break;
    }
  }
  return null;
};

export default Toaster;
