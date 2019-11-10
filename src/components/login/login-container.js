import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useLoginForm = callback => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  let { username, password } = inputs;

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      console.log(inputs);
      axios
        .post(
          'http://localhost:3001/auth/login',
          {
            username: username,
            password: password,
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          if (data['success'] === true) {
            localStorage.setItem('token', data['token']);
            console.log('Bravo, tu es connecté.e !');
            callback(true)
          } else {
            console.log('Nope, try again');
            toast.error(data.err);
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

export default useLoginForm;
