import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../app/AuthContext';
import { toast } from 'react-toastify';
import _ from 'lodash';

const SuggestionsContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [suggestionsResult, setSuggestionsResult] = useState([]);
  const [suggestionsOptions, setSuggestionsOptions] = useState({
    ageRange: [18, 85],
    popularityRange: [0, 100],
    interests: [],
    distanceMax: 100,
    sort: 'score',
  });
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
            _.pickBy(suggestionsResult, { visitor: likedId }),
          );

          let newSuggestionsResult = suggestionsResult;
          indexToModify.forEach(index => {
            newSuggestionsResult[parseInt(index, 10)] = {
              ...newSuggestionsResult[parseInt(index, 10)],
              liking: !suggestionsResult[parseInt(index, 10)].liking,
            };
          });
          document
            .querySelectorAll(`[visitor*="${likedId}"]`)
            .forEach(element => {
              if (element.classList.contains('MuiIconButton-colorSecondary'))
                element.classList.remove('MuiIconButton-colorSecondary');
              else element.className += ' MuiIconButton-colorSecondary';
            });
          setSuggestionsResult(newSuggestionsResult);
        }
      });
  };

  const handleSort = (event, profiles = suggestionsResult) => {
    let sortChoice = '';
    if (event) {
      sortChoice = event.target.value;
    } else {
      sortChoice = suggestionsOptions.sort;
    }
    let order = '';
    switch (sortChoice) {
      case 'score':
        order = 'desc';
        break;
      case 'distance':
        order = 'asc';
        break;
      case 'ageAsc':
        order = 'asc';
        break;
      case 'ageDesc':
        order = 'desc';
        break;
      case 'popularity':
        order = 'desc';
        break;
      case 'interests':
        order = 'asc';
        break;
      default:
    }
    const newSuggestionsOptions = {
      ...suggestionsOptions,
      sort: sortChoice,
    };
    setSuggestionsOptions(newSuggestionsOptions);
    setSuggestionsResult(
      _.orderBy(
        profiles,
        [
          profile => {
            switch (sortChoice) {
              case 'score':
                return profile.score;
              case 'distance':
                return profile.distance;
              case 'ageAsc':
                return profile.age;
              case 'ageDesc':
                return profile.age;
              case 'popularity':
                return profile.popularityRate;
              case 'interests':
                return profile.interests[0] ? profile.interests[0] : 'ZZZZ';
              default:
            }
          },
        ],
        [order],
      ),
    );
  };

  const handleChangeSlider = (type, newValue) => {
    if (type === 'interests') {
      newValue = newValue.map(interest => {
        return interest.name;
      });
      const newSuggestionsOptions = { ...suggestionsOptions, [type]: newValue };
      setSuggestionsOptions(newSuggestionsOptions);
      fetchSuggestions(newSuggestionsOptions);
      return;
    }
    const newSuggestionsOptions = { ...suggestionsOptions, [type]: newValue };
    setSuggestionsOptions(newSuggestionsOptions);
  };

  const fetchSuggestions = (suggestionsQuery = suggestionsOptions) => {
    axios
      .post(`http://localhost:3001/users/suggestions`, suggestionsQuery, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        if (result.data.authorized === false) {
          window.location = '/profile?message=profile_not_completed';
          return;
        }
        handleSort(null, result.data);
      });
  };

  if (_.isEmpty(currentUserProfile) && loaded === false) {
    userData.then(value => {
      setCurrentUserProfile(value.data);
      fetchSuggestions();
      setLoaded(true);
    });
  }
  return {
    currentUserProfile,
    loaded,
    suggestionsResult,
    suggestionsOptions,
    handleChangeSlider,
    setSuggestionsOptions,
    fetchSuggestions,
    handleLike,
    handleSort,
  };
};

export default SuggestionsContainer;
