import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const ProfileShowContainer = visitedUsername => {
  const [visitedProfile, setVisitedProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const fetchVisitedProfile = () =>
    axios
      .get(`http://localhost:3001/users/profile/${visitedUsername}`, {
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
    fetchVisitedProfile().then(data => {
      if (data.founded === true) {
        setVisitedProfile(data);
        setLoaded(true);
      } else {
        if (data.success === false) {
          window.location = '/?message=user_not_found';
        } else if (data.authorized === false) {
            window.location = '/profile?message=profile_not_completed';
          } else if (data.blocked === true) {
            window.location = '/?message=user_blocked_you';
          }
      }
    });
  }

  return { visitedProfile, loaded };
};

export default ProfileShowContainer;
