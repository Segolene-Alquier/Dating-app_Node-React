import axios from 'axios';
import _ from 'lodash';
import { useState } from 'react';

const HomeContainer = (userData, token) => {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fetchProfile = () => {
    axios
      .get(`http://localhost:3001/users/profile`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        setUserInfo(response.data);
        setLoaded(true);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (_.isEmpty(userInfo) && loaded === false) {
    fetchProfile();
  }

  return { userInfo, loaded };
};

export default HomeContainer;
