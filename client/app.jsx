'use strict';

import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { history as HashHistory } from 'react-router/lib/HashHistory';

import App from './components/App/app.jsx';

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
      </div>
    );
  }
}

React.render((
  <Router history={HashHistory}>
    <Route component={App}>
      <Route path="login" component={Login}/>
      <Redirect from="/" to="/login" />
    </Route>
  </Router>
), document.body);
