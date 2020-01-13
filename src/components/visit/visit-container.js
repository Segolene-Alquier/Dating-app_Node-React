import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const VisitContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [visitedProfile, setVisitedProfile] = useState([]);
  const [visitorProfile, setVisitorProfile] = useState({});
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
    Promise.all([userData, fetchVisitHistory()]).then(values => {
      console.log(values);
      setVisitedProfile(values[1]);
      setVisitorProfile(values[0].data);
      setLoaded(true);
    });
  }

  return { visitedProfile, visitorProfile, loaded };
};

export default VisitContainer;
