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
    age: [18, 85],
    popularityRate: [0, 100],
    interests: [],
    distanceMax: 100,
  });
  const authContext = useContext(AuthContext);
  const { userData, token } = authContext;

  const handleChangeSlider = (type, newValue) => {
    if (type === 'interests') {
      newValue = newValue.map(interest => {
        return interest.name
      })
    }
    const newSearchOptions = { ...searchOptions, [type]: newValue };
    setSearchOptions(newSearchOptions);
  };

  if (_.isEmpty(currentUserProfile) && loaded === false) {
    userData.then(value => {
      setCurrentUserProfile(value.data);
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
  };
};

export default SearchContainer;
