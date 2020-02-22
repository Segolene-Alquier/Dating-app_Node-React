import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useLoginForm = callback => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const ipLocation = () => {
    return new Promise(resolve => {
      const locationApi = axios.get('https://ipapi.co/json').then(response => {
        return [response.data.latitude, response.data.longitude];
      });
      resolve(locationApi);
    });
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

  const userLocation = async () => {
    const ip = ipLocation();
    const geo = await geoLocation();
    return geo || ip;
  };

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
      const location = await userLocation();
      axios
        .post(
          'http://localhost:3001/auth/login',
          {
            username,
            password,
            lat: location[1],
            lon: location[0],
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          if (data.success === true) {
            localStorage.setItem('token', data.token);
            callback(true);
          } else {
            toast.error(data.err);
          }
        });
    }
  };

  const handleInputChange = event => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useLoginForm;
