import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../app/AuthContext';
import { toast } from 'react-toastify';
import _ from 'lodash';

const SearchContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    ageRange: [18, 85],
    popularityRange: [0, 100],
    interests: [],
    distanceMax: 100,
  });
  const authContext = useContext(AuthContext);
  const { userData, token } = authContext;

  const handleLike = likedId => {
    console.log('liked user ', likedId);
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
            _.pickBy(searchResult, { visitor: likedId }),
          );

          let newSearchResult = searchResult;
          indexToModify.forEach(index => {
            newSearchResult[parseInt(index, 10)] = {
              ...newSearchResult[parseInt(index, 10)],
              liking: !searchResult[parseInt(index, 10)].liking,
            };
          });
          console.log(document.querySelectorAll(`[visitor*="${likedId}"]`));
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
    console.log(searchQuery);
    axios
      .post(`http://localhost:3001/users/search`, searchQuery, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => setSearchResult(result.data));
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
  };
};

export default SearchContainer;
