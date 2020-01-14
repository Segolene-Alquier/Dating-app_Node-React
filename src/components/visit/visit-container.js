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

  const handleLike = likedId => {
    console.log('liked user ', likedId);
    const indexToModify = _.keys(
      _.pickBy(visitedProfile, { visitor: likedId }),
    );

    let newVisitedProfile = visitedProfile;
    indexToModify.forEach(index => {
      newVisitedProfile[parseInt(index, 10)] = {
        ...newVisitedProfile[parseInt(index, 10)],
        liking: !visitedProfile[parseInt(index, 10)].liking,
      };
    });
    console.log(document.querySelectorAll(`[visitor*="${likedId}"]`));
    document
      .querySelectorAll(`[visitor*="${likedId}"]`)
      .forEach(
        element => {
          if (element.classList.contains('MuiIconButton-colorSecondary'))
            element.classList.remove('MuiIconButton-colorSecondary');
          else
            element.className += ' MuiIconButton-colorSecondary';
        }
      );
    setVisitedProfile(newVisitedProfile);
    axios.get(`http://localhost:3001/likes/like-unlike/${likedId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': token,
      },
    });
  };

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

  if (_.isEmpty(visitedProfile) && loaded === false) {
    Promise.all([userData, fetchVisitHistory()]).then(values => {
      console.log(values);
      setVisitedProfile(values[1]);
      setVisitorProfile(values[0].data);
      setLoaded(true);
    });
  }

  return { visitedProfile, visitorProfile, loaded, handleLike };
};

export default VisitContainer;
