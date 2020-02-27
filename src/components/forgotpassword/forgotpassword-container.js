import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const useForgotPasswordForm = callback => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  const { email } = inputs;

  const sendForgotPassword = email => {
    axios
      .post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/validation/forgotpasswordcreate`,
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
        if (data.success === true) {
          callback(true);
        } else {
          toast.error(data.err);
        }
      });
  };

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
      await sendForgotPassword(email);
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
    sendForgotPassword,
  };
};

export default useForgotPasswordForm;
