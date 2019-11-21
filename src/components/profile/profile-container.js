import { useState, use } from 'react';
import axios from 'axios';
import _ from 'lodash';

const UseProfileForm = (userData, token) => {
  const [profile, setProfile] = useState({});
  const [fileToUpload, setFileToUpload] = useState({ file: null });
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

  const submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    console.log(fileToUpload.file[0]);
    formData.append('file', fileToUpload.file[0]);
    axios
      .post(`http://localhost:3001/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': token,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFileUpload = event => {
    setFileToUpload({ file: event.target.files });
  };
  return {
    handleFileUpload,
    submitFile,
    handleProfileChange,
    profile,
  };
};

export default UseProfileForm;
