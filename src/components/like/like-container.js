import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { AuthContext } from '../app/AuthContext';

const LikeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [likedProfile, setLikedProfile] = useState(null);
  const [likerProfile, setLikerProfile] = useState({});
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;

  const handleLike = likedId => {
    axios
      .get(
        `http://${process.env.REACT_APP_PUBLIC_API_URL}/likes/like-unlike/${likedId}`,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
      .then(result => {
        if (result.data.blocked) {
          toast.error(result.data.message);
        } else {
          const indexToModify = _.keys(
            _.pickBy(likedProfile, { visitor: likedId }),
          );

          const newLikeedProfile = likedProfile;
          indexToModify.forEach(index => {
            newLikeedProfile[parseInt(index, 10)] = {
              ...newLikeedProfile[parseInt(index, 10)],
              liking: !likedProfile[parseInt(index, 10)].liking,
            };
          });
          document
            .querySelectorAll(`[visitor*="${likedId}"]`)
            .forEach(element => {
              if (element.classList.contains('MuiIconButton-colorSecondary'))
                element.classList.remove('MuiIconButton-colorSecondary');
              else element.className += ' MuiIconButton-colorSecondary';
            });
          setLikedProfile(newLikeedProfile);
        }
      });
  };

  const fetchLikeHistory = () =>
    axios
      .get(`http://${process.env.REACT_APP_PUBLIC_API_URL}/likes/`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (process.env.REACT_APP_VERBOSE === 'true') console.log(error);
      });

  if (likedProfile === null && loaded === false) {
    Promise.all([userData, fetchLikeHistory()]).then(values => {
      setLikedProfile(values[1]);
      setLikerProfile(values[0].data);
      setLoaded(true);
    });
  }

  return { likedProfile, likerProfile, loaded, handleLike };
};

export default LikeContainer;
