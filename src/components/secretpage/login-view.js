import React from 'react';
import auth from '../auth';

const Secret = () => {
    // console.log(auth.isLoggedIn)
    const {isLoggedIn} = auth();
    isLoggedIn();
    return (
      <h1>Hello world!</h1>
      
    );
}

export default Secret;
