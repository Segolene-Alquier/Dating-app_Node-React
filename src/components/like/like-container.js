import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';
import { toast } from 'react-toastify';

const LikeContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [likedProfile, setLikedProfile] = useState(null);
  const [likerProfile, setLikerProfile] = useState({});
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
            _.pickBy(likedProfile, { visitor: likedId }),
          );

          let newLikeedProfile = likedProfile;
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
