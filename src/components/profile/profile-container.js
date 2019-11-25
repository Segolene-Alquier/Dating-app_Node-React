import { useState, use } from 'react';
import axios from 'axios';
import _ from 'lodash';

const UseProfileForm = (userData, token) => {
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

  const submitFile = file => {
    const formData = new FormData();
    console.log(file[0]);
    formData.append('file', file[0]);
    axios
      .post(`http://localhost:3001/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token,
        },
      })
      .then(response => {
        console.log(response);
        const newInput = {
          ...profile,
          images: [...profile.images, response.data.Location],
        };
        setProfile(newInput);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFileUpload = event => {
    submitFile(event.target.files);
  };
  return {
    handleFileUpload,
    submitFile,
    handleProfileChange,
    profile,
  };
};

export default UseProfileForm;
