import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';
import { toast } from 'react-toastify';

const LikeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [likeedProfile, setLikeedProfile] = useState({});
  const [likeorProfile, setLikeorProfile] = useState({});
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;

  const handleLike = likedId => {
    axios
      .get(`http://localhost:3001/likes/like-unlike/${likedId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        if (result.data.blocked) {
          toast.error(result.data.message);
        } else {
          const indexToModify = _.keys(
            _.pickBy(likeedProfile, { visitor: likedId }),
          );

          let newLikeedProfile = likeedProfile;
          indexToModify.forEach(index => {
            newLikeedProfile[parseInt(index, 10)] = {
              ...newLikeedProfile[parseInt(index, 10)],
              liking: !likeedProfile[parseInt(index, 10)].liking,
            };
          });
          console.log('newLikeedProfile', newLikeedProfile);
          document
            .querySelectorAll(`[visitor*="${likedId}"]`)
            .forEach(element => {
              if (element.classList.contains('MuiIconButton-colorSecondary'))
                element.classList.remove('MuiIconButton-colorSecondary');
              else element.className += ' MuiIconButton-colorSecondary';
            });
          setLikeedProfile(newLikeedProfile);
          console.log('likeedProfile', likeedProfile);
        }
      });
  };

  const fetchLikeHistory = () =>
    axios
      .get('http://localhost:3001/likes/', {
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

  if (_.isEmpty(likeedProfile) && loaded === false) {
    Promise.all([userData, fetchLikeHistory()]).then(values => {
      console.log(values);
      setLikeedProfile(values[1]);
      setLikeorProfile(values[0].data);
      setLoaded(true);
    });
  }

  return { likeedProfile, likeorProfile, loaded, handleLike };
};

export default LikeContainer;
