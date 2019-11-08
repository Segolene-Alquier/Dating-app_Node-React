import React from 'react';
import Signup from '../signup';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../login';
import Secret from '../secretpage';
import { AuthProvider } from './AuthContext';
import SecureRoute from './SecureRoute';
import NotLoggedRoute from './NotLoggedRoute';
// import withAuth from '../auth/AuthContainer'
// import auth from '../auth';
import Nav from '../nav';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Route path="/" />
        <NotLoggedRoute path="/signup" component={Signup} />
        <NotLoggedRoute path="/login" component={Login} />
        <SecureRoute path="/secret" component={Secret} />
      </Router>
    </AuthProvider>
  );
}

export default App;
