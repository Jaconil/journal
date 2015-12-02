'use strict';

import request from 'superagent';
import when from 'when';
import _ from 'lodash';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory, useBasename } from 'history';

var initialUserState = {
  token: sessionStorage.getItem('user.token') || '',
  nbLogin: 0
};

var userReducer = function(state = initialUserState, action) {
  console.log('userReducer called with action ', action.type, state);
  switch (action.type) {
    case 'USER_UNAUTHORIZED':
      return _.assign({}, state, {token: ''});
    case 'USER_LOGIN_ERROR':
      return _.assign({}, state, {nbLogin: state.nbLogin + 1});
    case 'USER_LOGIN_SUCCESS':
      sessionStorage.setItem('user.token', action.payload.token);
      return _.assign({}, state, {token: action.payload.token});
    default:
      return state;
  }
};

//app.isLogged = false
//day.day = {}
//daysList.windowHeight = 0
//loginBox.nbLogin = 0
//writePage.remainingDays = []
//writePage.selectedDay = 0

var apiMiddleware = store => next => action => {
  if (!action.api) {
    return next(action);
  }

  var method = action.api.method || 'GET';
  var path = 'api' + action.api.endpoint || '';

  var req = request(method, path).query({
    token: store.getState().user.token
  });

  if (action.api.query) {
    req.query(action.api.query);
  }

  if (action.api.body) {
    req.send(action.api.body);
  }

  req.end(function(err, response) {
    if (response.unauthorized) {
      return next({
        type: 'USER_UNAUTHORIZED'
      });
    }

    if (!err && response.ok) {
      next({
        type: action.type + '_SUCCESS',
        payload: response.body
      });
    } else {
      next({
        type: action.type + '_ERROR',
        error: err
      });
    }
  });

  next({
    type: action.type
  });
};

export default function() {

  const reducer = combineReducers({
    router: routerStateReducer,
    user: userReducer
  });

  const history = _.partial(useBasename(createHistory), {
    basename: process.env.BASEPATH
  });

  return compose(
    applyMiddleware(apiMiddleware),
    reduxReactRouter({ createHistory: history })
  )(createStore)(reducer);
};
