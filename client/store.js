'use strict';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import daysReducer from './reducers/days';
import notificationsReducer from './reducers/notifications';

import authMiddleware from './middlewares/authMiddleware';
import apiMiddleware from './middlewares/apiMiddleware';

export default function(browserHistory) {

  const reducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    days: daysReducer,
    notifications: notificationsReducer
  });

  const middleware = routerMiddleware(browserHistory);

  return applyMiddleware(middleware, authMiddleware, thunk, apiMiddleware)(createStore)(reducer);
}
