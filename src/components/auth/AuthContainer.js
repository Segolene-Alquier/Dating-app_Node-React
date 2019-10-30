import decode from "jwt-decode";
import axios from "axios";
import React, { Component, useEffect } from 'react'
import Login from '../login'
import { Redirect } from 'react-router-dom';

const auth = callback => {

    const getToken = () => {
        return (localStorage.getItem("token"))
    }

    // const withAuth =  (ComponentToProtect) => {
    //     let authenticated;
    //     useEffect(() => {
    //         axios.get('http://localhost:3001/auth/checkToken', {
    //         headers: {
    //           "Content-type": "application/json; charset=UTF-8",
    //           "x-access-token": getToken()
    //         }
    //       }).then(({
    //         data
    //       }) => { 

    //         authenticated = data['success']
                
    //         //     console.log("withAuth : ", data['success'])

    //         //       return (
    //         //         <Login/>
    //         //       )
    //         //   }
    //         //   else {
               
    //         //   }
    //       })
    //     })
          
    //       console.log("AUTH TES MORTS : ", authenticated)
    //     if (1 == 1) {
    //     return(
    //         ComponentToProtect
    //     )
    //     }
    // }

    const isTokenExpired = token => {
        const currentTime = Date.now() / 1000
        try {
            const decoded = decode(token)
            if (decoded.exp < currentTime) {
                console.log("Your token is expired")
                return (true)
            }
            else {
                return (false)
            }
        } catch (err) {
            console.log(err)
            return (true)
        }
    }

    const loggedIn = () => {
        const token = getToken()
        if (token === null || token === undefined) {
            // pas connecté
            return (false)
        }
        else {
            if (isTokenExpired(token)) {
                // need to delete expired token ?
                return (false)
            }
        }
        console.log('TOKEN : ', token)
        return (true)
    }
    return {
        getToken,
        loggedIn,
        // withAuth
    }
}

export default auth