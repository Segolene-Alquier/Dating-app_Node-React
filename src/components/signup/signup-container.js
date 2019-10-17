import {
  useState
} from 'react';
import axios from 'axios';

const useSignUpForm = callback => {
  const [inputs, setInputs] = useState({
    firstname: "",
    surname: "",
    username: "",
    email: "",
    password1: "",
    password2: ""
  });
  let {
    firstname,
    surname,
    username,
    email,
    password1
  } = inputs
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      console.log(inputs)
      axios.post('http://localhost:3001/users', {
        firstname: firstname,
        surname: surname,
        username: username,
        email: email,
        password: password1
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(({
        data
      }) => {
        if (data['created'] === true)
          alert("User created")
        else
          alert("User not created")
      })
    }
    callback();
  }
  const handleInputChange = event => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value
    };
    setInputs(newInput);
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useSignUpForm;