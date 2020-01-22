import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { AuthContext } from '../app/AuthContext';

const ProfileShowContainer = visitedUsername => {
  const [visitedProfile, setVisitedProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const handleBlock = (blockedId, blocked, setBlocked) => {
    console.log('token', token);
    console.log('blocked user ', blockedId);
    axios
      .post(
        `http://localhost:3001/block/block-unblock/${blockedId}`,
        {},
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
      .then(result => {
        console.log('result deleted:', result.data.deleted);
        console.log('result created:', result.data.created);
        if (result.data.deleted === true) {
          setBlocked(false);
          toast.success('You just unblocked this user');

        }
        if (result.data.created === true) {
          setBlocked(true);
          toast.success('You just blocked this user');
        }
        //   if (result.data.blocked) {
        //     toast.error(result.data.message);
        //   } else {
        //     const indexToModify = _.keys(
        //       _.pickBy(visitedProfile, { visitor: blockedId }),
        //     );

        //     let newVisitedProfile = visitedProfile;
        //     indexToModify.forEach(index => {
        //       newVisitedProfile[parseInt(index, 10)] = {
        //         ...newVisitedProfile[parseInt(index, 10)],
        //         liking: !visitedProfile[parseInt(index, 10)].liking,
        //       };
        //     });
        //     console.log(document.querySelectorAll(`[visitor*="${blockedId}"]`));
        //     document
        //       .querySelectorAll(`[visitor*="${blockedId}"]`)
        //       .forEach(element => {
        //         if (element.classList.contains('MuiIconButton-colorSecondary'))
        //           element.classList.remove('MuiIconButton-colorSecondary');
        //         else element.className += ' MuiIconButton-colorSecondary';
        //       });
        //     setVisitedProfile(newVisitedProfile);
        //   }
      });
  };

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

  return { visitedProfile, loaded, handleBlock };
};

export default ProfileShowContainer;
