import {useState} from 'react';
import axios from 'axios';

const useSignUpForm = callback => {
    const [inputs, setInputs] = useState({});
    let {firstname, surname, username, email, password1} = inputs
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
        }, {headers: {
          "Content-type": "application/json; charset=UTF-8"
        }}
      ).then(({data}) => {
        if (data['created'] === true)
          alert("User created")
        else 
          alert("User not created")
      })

        // fetch('http://localhost:3001/users', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     firstname: inputs['firstName'],
        //     surname: inputs['lastName'],
        //     username: inputs['userName'],
        //     email: inputs['email'],
        //     password: inputs['password1'],
        //   }),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        //   }
        // }).then(response => {
        //   let json = response.json()
        //   console.log(JSON.parse(json))
        // })
        // .then(json => {
        //   console.log(JSON.parse(json))
        //     // if (json["created"] == true)
        //     //   alert("User created")
        //     // else 
        //     //   alert("The account couldn't be created")
        //   });
        //   // console.log(json)
        // // });
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
