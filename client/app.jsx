'use strict';

import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { history as HashHistory } from 'react-router/lib/HashHistory';

import App from './components/App/app.jsx';

class About extends React.Component {
  render() {
    return (
      <div>
        About
      </div>
    );
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <div>
        Inbox
      </div>
    );
  }
}

React.render((
  <Router history={HashHistory}>
    <Route component={App}>
      <Route path="about" component={About}/>
      <Route path="inbox" component={Inbox}/>
      <Redirect from="/" to="/about" />
    </Route>
  </Router>
), document.body);
