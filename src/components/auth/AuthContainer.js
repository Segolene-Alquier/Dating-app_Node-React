/* eslint-disable no-console */
import decode from 'jwt-decode';
import axios from 'axios';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isTokenExpired = token => {
  const currentTime = Date.now() / 1000;
  try {
    const decoded = decode(token);
    if (decoded.exp < currentTime) {
      if (process.env.REACT_APP_VERBOSE === 'true')
        console.log('Your token is expired');
      return true;
    }
    return false;
  } catch (err) {
    if (process.env.REACT_APP_VERBOSE === 'true') console.log(err);
    return true;
  }
};

export const getUserData = async token => {
  if (!token || isTokenExpired(token)) {
    return null;
  }
  const userData = await axios.get(
    `http://${process.env.REACT_APP_PUBLIC_API_URL}/auth/checkToken`,
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': token,
      },
    },
  );
  return userData.data;
};

export const logout = (e, setIsLoggedIn) => {
  e.preventDefault();
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  window.location = '/?message=logout_success';
};
