import React from 'react';
import Signup from '../signup'
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from '../login';
import Secret from '../secretpage';

function App() {
  return (
    <Router>
      <Route path="/"/> 
      <Route path="/signup" component={Signup}/> 
      <Route path="/secret" component={Secret}/> 
      <Route path="/login" component={Login}/> 
    </Router>
  );
}

export default App;
