'use strict';

/* eslint no-unused-vars: 0 */
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { ReduxRouter } from 'redux-router';

import createStore from './store';

import App from './components/App/app.jsx';
import LoginBox from './components/LoginBox/loginBox.jsx';
import WritePage from './components/WritePage/writePage.jsx';

import events from './events';

global.events = events;

const store = createStore();

ReactDOM.render((
  <Provider store={store}>
    <ReduxRouter>
      <Route component={App}>
        <Route path="login" component={LoginBox}/>
        <Route path="write" component={WritePage}/>
        <Redirect from="/" to="/login" />
      </Route>
    </ReduxRouter>
  </Provider>
), document.querySelector('#app'));
