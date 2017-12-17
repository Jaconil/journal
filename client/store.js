import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import daysReducer from './reducers/days';
import notificationsReducer from './reducers/notifications';

import apiMiddleware from './middlewares/apiMiddleware';

/**
 * Creates the app state
 *
 * @returns {object} Created state
 */
export default () => {
  const reducer = combineReducers({
    user: userReducer,
    days: daysReducer,
    notifications: notificationsReducer
  });

  return applyMiddleware(thunk, apiMiddleware)(createStore)(reducer);
};
