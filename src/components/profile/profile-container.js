import { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';

// import { AuthContext } from '../app/AuthContext';

const UseProfileForm = (userData, token) => {
  const [profile, setProfile] = useState({});
  const [changedFields, setChangedFields] = useState({});

  if (_.isEmpty(profile))
    userData.then(data => {
      setProfile(data.data);
    });

  const handleProfileChange = event => {
    event.persist();
    console.log('event type :', event.target.type);
    console.log('event name:', event.target.name);
    console.log('event value', event.target.value);
    console.log('event check', event.target.checked);

    let newInput;
    let newChangedFields;
    if (event.target.type !== 'checkbox') {
      newInput = {
        ...profile,
        [event.target.name]: event.target.value,
      };
      newChangedFields = {
        ...changedFields,
        [event.target.name]: event.target.value,
      };
    } else {
      if (event.target.name === 'gender') {
        console.log('kikou');
        newInput = {
          ...profile,
          [event.target.name]: event.target.checked,
        };
        newChangedFields = {
          ...changedFields,
          [event.target.name]: event.target.checked,
        };
      } else {
        newInput = {
          ...profile,
          [event.target.name]: event.target.checked,
        };
        newChangedFields = {
          ...changedFields,
          [event.target.name]: event.target.checked,
        };
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

  return {
    handleProfileChange,
    profile,
    handleSubmitParameters,
  };
};

export default UseProfileForm;
