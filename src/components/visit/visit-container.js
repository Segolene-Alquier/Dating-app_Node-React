import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const VisitContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [visitedProfile, setVisitedProfile] = useState([])
  const authContext = useContext(AuthContext);
  const { userData, token } = authContext;

  const fetchVisitHistory = () =>
    axios
      .get('http://localhost:3001/visits/', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

  if (_.isEmpty(visitedProfile)) {
    fetchVisitHistory().then(data => {
      console.log(data)
      setVisitedProfile(data)
      setLoaded(true);
      // if (data.founded === true) {
      //   setVisitedProfile(data);
      //   setLoaded(true);
      // } else {
      //   if (data.success === false) {
      //     window.location = '/?message=user_not_found';
      //   } else {
      //     console.log(data.message);
      //   }
      // }
    });
  }

  return { visitedProfile, loaded };
};

export default VisitContainer;
