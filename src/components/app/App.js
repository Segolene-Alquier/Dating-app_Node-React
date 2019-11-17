import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Signup from '../signup';
import './App.css';
import Login from '../login';
import Secret from '../secretpage';
import Home from '../home';
import { AuthProvider } from './AuthContext';
import SecureRoute from './SecureRoute';
import NotLoggedRoute from './NotLoggedRoute';
import 'react-toastify/dist/ReactToastify.css';
// import withAuth from '../auth/AuthContainer'
// import auth from '../auth';
import Nav from '../nav';
import Toaster from '../toaster';
import UserValidation from '../uservalidation';
import ResetForgotPassword from '../ResetforgotPassword';
import ForgotPassword from '../forgotpassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <NotLoggedRoute path="/signup" component={Signup} />
          <NotLoggedRoute path="/login" component={Login} />
          <NotLoggedRoute
            path="/validation/newaccount/:token"
            component={UserValidation}
          />
          <NotLoggedRoute path="/forgotpassword" component={ForgotPassword} />
          <NotLoggedRoute
            path="/validation/forgotpassword/:token"
            component={ResetForgotPassword}
          />

          <SecureRoute path="/secret" component={Secret} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Toaster />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
