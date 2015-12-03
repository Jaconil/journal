'use strict';

import _ from 'lodash';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory, useBasename } from 'history';

import userReducer from './reducers/user';
import daysReducer from './reducers/days';

import authMiddleware from './middlewares/authMiddleware';
import apiMiddleware from './middlewares/apiMiddleware';

export default function() {

  const reducer = combineReducers({
    router: routerStateReducer,
    user: userReducer,
    days: daysReducer
  });

  const history = _.partial(useBasename(createHistory), {
    basename: process.env.BASEPATH
  });

  return compose(
    applyMiddleware(authMiddleware, apiMiddleware),
    reduxReactRouter({ createHistory: history })
  )(createStore)(reducer);
}
