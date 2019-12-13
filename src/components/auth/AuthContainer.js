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

const geoLocation = () => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => {
      const currentLocation = [0.0, 0.0];
      currentLocation[0] = position.coords.latitude;
      currentLocation[1] = position.coords.longitude;
      resolve(currentLocation);
    });
    setTimeout(resolve, 2000);
  });
};

const updateGeoLocationLater = async () => {
  // return new Promise(resolve => {
  await navigator.geolocation.getCurrentPosition(async position => {
    const currentLocation = [0.0, 0.0];
    currentLocation[0] = position.coords.latitude;
    currentLocation[1] = position.coords.longitude;
    const update = await axios.put(
      'http://localhost:3001/users',
      { location: currentLocation },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': getToken(),
        },
      },
    );
    console.log(update);
  });
};

const ipLocation = () => {
  return new Promise(resolve => {
    const locationApi = axios.get('https://ipapi.co/json').then(response => {
      return [response.data.latitude, response.data.longitude];
    });
    resolve(locationApi);
  });
};

const location = async () => {
  const ip = ipLocation();
  const geo = await geoLocation();
  console.log(geo);
  if (geo === undefined) {
    updateGeoLocationLater();
  }
  return geo || ip;
};

export const getUserData = async token => {
  if (!token || isTokenExpired(token)) {
    return null;
  }
  const userLocation = await location();
  const userData = await axios.get('http://localhost:3001/auth/checkToken', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-access-token': token,
    },
    params: { lon: userLocation[0], lat: userLocation[1] },
  });
  return userData.data;
};

export const logout = (e, setIsLoggedIn) => {
  e.preventDefault();
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  window.location = '/?message=logout_success';
};
