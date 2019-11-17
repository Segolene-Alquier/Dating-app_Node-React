import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const useForgotPasswordForm = callback => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  const { email } = inputs;
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      console.log(inputs);
      axios
        .post(
          'http://localhost:3001/validation/forgotpasswordcreate',
          {
            email,
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          console.log('DATA', data);
          if (data.success === true) {
            callback(true);
          } else {
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

export default useForgotPasswordForm;
