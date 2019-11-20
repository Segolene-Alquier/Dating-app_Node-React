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
      console.log('Your token is expired');
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return true;
  }
};

export const checkAuthentification = async (data, setSecureAuth) => {
  if (isTokenExpired(data.token)) {
    setSecureAuth(false);
    return;
  }
  const isAuthenticaded = await axios.get(
    'http://localhost:3001/auth/checkToken',
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': data.token,
      },
    },
  );
  setSecureAuth(isAuthenticaded.data.success);
};

export const getUserData = async token => {
  if (!token || isTokenExpired(token)) {
    return null;
  }
  const userData = await axios.get('http://localhost:3001/auth/checkToken', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-access-token': token,
    },
  });
  return userData.data;
};

export const location = async () => {
  return navigator.geolocation.getCurrentPosition(position => {
    const currentLocation = [0.0, 0.0];
    currentLocation[0] = position.coords.latitude;
    currentLocation[1] = position.coords.longitute;
    return currentLocation;
  });
};

export const logout = (e, setIsLoggedIn) => {
  e.preventDefault();
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  window.location = '/?message=logout_success';
};
