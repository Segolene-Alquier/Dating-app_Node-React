import axios from "axios";
import React, {
  Component,
  useEffect
} from 'react'
import {
  getToken
} from './AuthContainer'

function withAuth(ComponentToProtect) {
    useEffect(() => {

        axios.get('http://localhost:3001/auth/checkToken', {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": getToken()
          }
        }).then(({
          data
        }) => {
          console.log("withAuth : ", data)
        })
        // return ("coucou/")
    }
    return (
      ComponentToProtect
    
    )
   
}

export default withAuth