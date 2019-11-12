import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const useSignUpForm = callback => {
  const [inputs, setInputs] = useState({
    firstname: '',
    surname: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { firstname, surname, username, email, password1 } = inputs;
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      console.log(inputs);
      axios
        .post(
          'http://localhost:3001/users',
          {
            firstname,
            surname,
            username,
            email,
            password: password1,
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          console.log('DATA', data);
          if (data.created === true) {
            callback(true);
          } else {
            console.log(data);
            data.errors.forEach(error => {
              toast.error(error);
            });
          }
        });
    }
  };
  const handleInputChange = event => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useSignUpForm;
