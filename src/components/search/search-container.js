import axios from 'axios';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const SearchContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    ageRange: [18, 85],
    popularityRange: [0, 100],
    interests: [],
    distanceMax: 100,
    sort: '',
  });
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
            _.pickBy(searchResult, { visitor: likedId }),
          );

          const newSearchResult = searchResult;
          indexToModify.forEach(index => {
            newSearchResult[parseInt(index, 10)] = {
              ...newSearchResult[parseInt(index, 10)],
              liking: !searchResult[parseInt(index, 10)].liking,
            };
          });
          document
            .querySelectorAll(`[visitor*="${likedId}"]`)
            .forEach(element => {
              if (element.classList.contains('MuiIconButton-colorSecondary'))
                element.classList.remove('MuiIconButton-colorSecondary');
              else element.className += ' MuiIconButton-colorSecondary';
            });
          setSearchResult(newSearchResult);
        }
      });
  };

  const handleSort = (event, profiles = searchResult) => {
    let sortChoice = '';
    if (event) {
      sortChoice = event.target.value;
    } else {
      sortChoice = searchOptions.sort;
    }
    let order = '';
    switch (sortChoice) {
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
    const newSearchOptions = { ...searchOptions, sort: sortChoice };
    setSearchOptions(newSearchOptions);
    setSearchResult(
      _.orderBy(
        profiles,
        [
          profile => {
            switch (sortChoice) {
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
      const newSearchOptions = { ...searchOptions, [type]: newValue };
      setSearchOptions(newSearchOptions);
      fetchSearch(newSearchOptions);
      return;
    }
    const newSearchOptions = { ...searchOptions, [type]: newValue };
    setSearchOptions(newSearchOptions);
  };

  const fetchSearch = (searchQuery = searchOptions) => {
    axios
      .post(
        `http://${process.env.REACT_APP_PUBLIC_API_URL}/users/search`,
        searchQuery,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
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
      fetchSearch();
      setLoaded(true);
    });
  }
  return {
    currentUserProfile,
    loaded,
    searchResult,
    searchOptions,
    handleChangeSlider,
    setSearchOptions,
    fetchSearch,
    handleLike,
    handleSort,
  };
};

export default SearchContainer;
