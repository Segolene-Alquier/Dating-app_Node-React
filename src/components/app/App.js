import React, {  } from 'react';
import Signup from '../signup';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login';
import Secret from '../secretpage';
import Home from '../home'
import { AuthProvider } from './AuthContext';
import SecureRoute from './SecureRoute';
import NotLoggedRoute from './NotLoggedRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import withAuth from '../auth/AuthContainer'
// import auth from '../auth';
import Nav from '../nav';

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Router>
        <Switch>
          <NotLoggedRoute path="/signup" component={Signup} />
          <NotLoggedRoute path="/login" component={Login} />
          <SecureRoute path="/secret" component={Secret} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
