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
  };
};

export default SearchContainer;
