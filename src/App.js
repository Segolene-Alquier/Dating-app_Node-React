import React from 'react';
import Signup from './users/Signup'
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/"/> 
      <Route path="/signup" component={Signup}/> 
    </Router>
  );
}

export default App;
