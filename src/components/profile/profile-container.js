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

  const handleFileUpload = event => {
    const formData = new FormData();
    console.log(event.target.files[0]);
    formData.append('file', event.target.files[0]);
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

  const handleDeleteImage = url => {
    axios
      .post(`http://localhost:3001/images/delete`, {url}, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        if (response.data.success === true) {
          const newInput = {
            ...profile,
            images: _.without(profile.images, url),
          };
          setProfile(newInput);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return {
    handleFileUpload,
    handleDeleteImage,
    handleProfileChange,
    profile,
  };
};

export default UseProfileForm;
