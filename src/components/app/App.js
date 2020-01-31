import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Signup from '../signup';
import './App.css';
import Login from '../login';
import Profile from '../profile';
import ProfileShow from '../profileshow';
import Search from '../search';
import Suggestions from '../suggestions';
import Visit from '../visit';
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
import Swipe from '../swipe';
import Chat from '../chat';
import ChatRoom from '../chatroom';

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
          <SecureRoute path="/search" component={Search} />
          <SecureRoute path="/suggestions" component={Suggestions} />
          <SecureRoute path="/profile/:username" component={ProfileShow} />
          <SecureRoute path="/profile" component={Profile} />
          <SecureRoute path="/visits" component={Visit} />
          <SecureRoute path="/swipe" component={Swipe} />
          <SecureRoute path="/chat" component={Chat} />
          <SecureRoute path="/chatroom/:id" component={ChatRoom} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Toaster />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
