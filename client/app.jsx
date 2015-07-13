'use strict';

import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { history as HashHistory } from 'react-router/lib/HashHistory';

import App from './components/App/app.jsx';
import LoginBox from './components/LoginBox/loginBox.jsx';

React.render((
  <Router history={HashHistory}>
    <Route component={App}>
      <Route path="login" component={LoginBox}/>
      <Route path="write" component={LoginBox}/>
      <Redirect from="/" to="/login" />
    </Route>
  </Router>
), document.body);
