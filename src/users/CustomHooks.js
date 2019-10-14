import {useState} from 'react';

const useSignUpForm = callback => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = event => {
      if (event) {
        event.preventDefault();
        console.log(inputs)
        fetch('http://localhost:3001/users', {
          method: 'POST',
          body: JSON.stringify({
            firstname: inputs['firstName'],
            surname: inputs['lastName'],
            username: inputs['userName'],
            email: inputs['email'],
            password: inputs['password1'],
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => {
          return response.json()
        }).then(json => {
          // this.setState({
          //   user: json
          // });
          // console.log(json)
        });
      }
      callback();
    }
    const handleInputChange = event => {
      event.persist();
      setInputs(inputs => ({
          ...inputs, 
          [event.target.name]: event.target.value
        }));
    };
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  };

export default useSignUpForm;
