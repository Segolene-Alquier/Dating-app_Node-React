import { useState, use } from 'react';
import _ from 'lodash';

const UseProfileForm = userData => {
  const [profile, setProfile] = useState({});
  if (_.isEmpty(profile))
    userData.then(data => {
      console.log('newstate');
      setProfile(data.data);
    });
  console.log(profile);

  const handleProfileChange = event => {
    event.persist();
    console.log('name: ', event.target.name);
    console.log('value: ', event.target.value);
    const newInput = {
      ...profile,
      [event.target.name]: event.target.value,
    };
    setProfile(newInput);
  };
  return {
    handleProfileChange,
    profile,
  };
};

export default UseProfileForm;
