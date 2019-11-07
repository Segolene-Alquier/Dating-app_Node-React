import React from 'react';
import auth from '../auth';
import axios from 'axios';

const Secret = () => {
  // const {getToken, loggedIn} = auth();

  // const token = getToken()
  // console.log("CURRENT TOKEN ", token)
  // // console.log(loggedIn());
  // // if (loggedIn()){
  //   axios.get('http://localhost:3001/users', {
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       "x-access-token": token
  //     }
  //   }).then(({
  //     data
  //   }) => {
  //     console.log(data)
  //   })
  return <h1>Hello world!</h1>;
  // }
  // else {
  //   return(
  //     <h1>Tu n'est pas le bienvenue ici!</h1>
  //   )
  // }
};

export default Secret;
