import React from 'react';
import Signup from '../signup';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../login';
import Secret from '../secretpage';
import { AuthProvider } from './AuthContext';
import SecureRoute from './SecureRoute';
// import withAuth from '../auth/AuthContainer'
// import auth from '../auth';
// const {withAuth} = auth()

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" />
        <Route path="/signup" component={Signup} />
        <SecureRoute path="/secret" component={Secret} />
        <Route path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
