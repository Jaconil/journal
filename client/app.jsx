'use strict';

/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import App from './components/App/app.jsx';
import LoginBox from './components/LoginBox/loginBox.jsx';
import WritePage from './components/WritePage/writePage.jsx';

ReactDOM.render((
  <Router history={createHashHistory({ queryKey: false })}>
    <Route component={App}>
      <Route path="login" component={LoginBox}/>
      <Route path="write" component={WritePage}/>
      <Redirect from="/" to="/login" />
    </Route>
  </Router>
), document.querySelector('#app'));
