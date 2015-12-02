'use strict';

import _ from 'lodash';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory, useBasename } from 'history';
import thunk from 'redux-thunk';

var initialUserState = {
  token: '',
  nbLogin: 0
};

var userReducer = function(state = initialUserState, action) {
  switch (action.type) {
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

export default function() {

  const reducer = combineReducers({
    router: routerStateReducer,
    user: userReducer
  });

  const history = _.partial(useBasename(createHistory), {
    basename: process.env.BASEPATH
  });

  return compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory: history })
  )(createStore)(reducer);
};
