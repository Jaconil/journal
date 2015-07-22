'use strict';

import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { history as HashHistory } from 'react-router/lib/HashHistory';

import App from './components/App/app.jsx';
import LoginBox from './components/LoginBox/loginBox.jsx';
import WritePage from './components/WritePage/writePage.jsx';

React.render((
  <Router history={HashHistory}>
    <Route component={App}>
      <Route path="login" component={LoginBox}/>
      <Route path="write" component={WritePage}/>
      <Redirect from="/" to="/login" />
    </Route>
  </Router>
), document.body);
