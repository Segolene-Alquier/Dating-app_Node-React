import { useState, use } from 'react';
import _ from 'lodash';
import axios from 'axios';
// import { AuthContext } from '../app/AuthContext';

const UseProfileForm = (userData, token) => {
  const [profile, setProfile] = useState({});
  const [changedFields, setChangedFields] = useState({});

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
    const newChangedFields = {
      ...changedFields,
      [event.target.name]: event.target.value,
    };
    setProfile(newInput);
    setChangedFields(newChangedFields);
  };

  const handleSubmitParameters = event => {
    event.persist();
    // console.log('submit name: ', profile);
    console.log('changedFields: ', changedFields);

    if (event) {
      event.preventDefault();
      axios
        .put('http://localhost:3001/users', changedFields, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        })
        .then(({ data }) => {
          console.log('data bitch', data);
        });
    }
  };

  return {
    handleProfileChange,
    profile,
    handleSubmitParameters,
  };
};

export default UseProfileForm;
