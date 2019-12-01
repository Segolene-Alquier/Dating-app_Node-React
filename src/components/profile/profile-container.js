import axios from 'axios';
import { useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

// import { AuthContext } from '../app/AuthContext';
let newInput;
let newChangedFields;

const UseProfileForm = (userData, token) => {
  const [profile, setProfile] = useState({});
  const [changedFields, setChangedFields] = useState({});

  if (_.isEmpty(profile))
    userData.then(data => {
      setProfile(data.data);
    });

  const handleTextParametersChange = event => {
    newInput = {
      ...profile,
      [event.target.name]: event.target.value,
    };
    newChangedFields = {
      ...changedFields,
      [event.target.name]: event.target.value,
    };
  };

  const isChecked = fieldId => {
    console.log('array', profile.gender);
    console.log('field id', typeof fieldId);

    if (profile.gender) {
      const isCkecked = ('includes', profile.gender.includes(fieldId));
      return isCkecked;
    }
    return false;
  };

  const handleNotifChange = event => {
    newInput = {
      ...profile,
      [event.target.name]: event.target.checked,
    };
    newChangedFields = {
      ...changedFields,
      [event.target.name]: event.target.checked,
    };
  };

  const handleGenderChange = event => {
    console.log('kikou');
    newInput = {
      ...profile,
      [event.target.name]: event.target.value,
    };
    newChangedFields = {
      ...changedFields,
      [event.target.name]: event.target.value,
    };
  };

  const handleProfileChange = event => {
    event.persist();
    console.log('event type :', event.target.type);
    console.log('event name:', event.target.name);
    console.log('event value', event.target.value);
    console.log('event check', event.target.checked);

    if (event.target.type !== 'checkbox') {
      handleTextParametersChange(event);
    } else {
      if (event.target.name === 'gender') {
        handleGenderChange(event);
      } else {
        handleNotifChange(event);
      }
    }
    setProfile(newInput);
    setChangedFields(newChangedFields);
    // console.log("event", event)
    console.log('newInput :', newInput);
    // console.log('changed :', typeof newChangedFields.notificationMail);
  };

  const handleSubmitParameters = event => {
    event.persist();
    if (_.isEmpty(changedFields)) {
      toast.error("You didn't make any changes!");
    } else if (event) {
      event.preventDefault();
      axios
        .put('http://localhost:3001/users', changedFields, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        })
        .then(response => {
          if (response.data.success === true) {
            toast.success(response.data.message);
            setChangedFields({});
          } else {
            console.log(response);
            response.data.errors.forEach(error => {
              toast.error(error);
            });
          }
        });
    }
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
        if (profile.profilePicture === null) {
          const newInput = {
            ...profile,
            images: [...profile.images, response.data.Location],
            profilePicture: response.data.Location,
          };
          setProfile(newInput);
        } else {
          const newInput = {
            ...profile,
            images: [...profile.images, response.data.Location],
          };
          setProfile(newInput);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteImage = url => {
    axios
      .post(
        `http://localhost:3001/images/delete`,
        { url },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
      .then(response => {
        if (response.data.success === true) {
          if (url === profile.profilePicture) {
            const newInput = {
              ...profile,
              images: _.without(profile.images, url),
              profilePicture:
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
            };
            setProfile(newInput);
          } else {
            const newInput = {
              ...profile,
              images: _.without(profile.images, url),
            };
            setProfile(newInput);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChangeProfileImage = pictureUrl => {
    const newInput = {
      ...profile,
      profilePicture: pictureUrl,
    };
    setProfile(newInput);
  };

  return {
    handleFileUpload,
    handleDeleteImage,
    handleProfileChange,
    profile,
    handleChangeProfileImage,
    handleSubmitParameters,
    isChecked,
  };
};

export default UseProfileForm;
