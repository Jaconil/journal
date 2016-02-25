'use strict';

import crypto from 'crypto';

import { push } from 'react-router-redux';

/**
 * Login a given user
 *
 * @param {string} username - User login
 * @param {string} password - User password
 * @returns {object} Action
 */
export function login(username, password) {
  var hash = crypto.createHash('sha256').update(password).digest('hex');

  return dispatch => {
    return dispatch({
      type: 'USER_LOGIN',
      api: {
        endpoint: '/user/login',
        query: { username: username, password: hash }
      }
    }).then(() => {
      dispatch(push('/write'));
    }).catch(() => {});
  };
}

/**
 * Logout the current user
 *
 * @returns {object} Action
 */
export function logout() {
  return {
    type: 'USER_LOGOUT'
  };
}
