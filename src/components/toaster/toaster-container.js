import { toast } from 'react-toastify';

export const loginSuccess = () => {
  const toasterType = 'success';
  const toasterMessage = 'You successfully logged in!';

  toast(toasterMessage, { type: toasterType });
};

export const logoutSuccess = () => {
  const toasterType = 'success';
  const toasterMessage = 'You successfully logged out!';

  toast(toasterMessage, { type: toasterType });
};

export const signupSuccess = () => {
  const toasterType = 'success';
  const toasterMessage = 'You successfully signed up!';

  toast(toasterMessage, { type: toasterType });
};

export const alreadyLoggedin = () => {
  const toasterType = 'warning';
  const toasterMessage = 'You are already logged in!';

  toast(toasterMessage, { type: toasterType });
};

export const userValidated = () => {
  const toasterType = 'success';
  const toasterMessage = 'Your account is successfully validated!';

  toast(toasterMessage, { type: toasterType });
};
export const userNotValidated = () => {
  const toasterType = 'warning';
  const toasterMessage = 'The validation link is not valid!';

  toast(toasterMessage, { type: toasterType });
};
