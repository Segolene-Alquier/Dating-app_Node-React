import React from 'react';
import Signup from '../signup'
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from '../login';
import Secret from '../secretpage';
// import withAuth from '../auth/AuthContainer'
import auth from '../auth';
const {withAuth} = auth()

function App() {
  return (
    <Router>
      <Route path="/"/> 
      <Route path="/signup" component={Signup}/> 
      <Route path="/secret" component={withAuth(Secret)}/> 
      <Route path="/login" component={Login}/> 
    </Router>
  );
}

export default App;
