'use strict';

import crypto from 'crypto';

import { push } from 'react-router-redux';

/**
 * Updates the user token
 *
 * @param {string} token - User token
 * @returns {object} Action
 */
function updateToken(token) {
  sessionStorage.setItem('user.token', token);

  return {
    type: 'USER_TOKEN_UPDATE',
    payload: {
      token
    }
  };
}

/**
 * Login a given user
 *
 * @param {string} username - User login
 * @param {string} password - User password
 * @returns {object} Action
 */
export function login(username, password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex');

  return dispatch => {
    return dispatch({
      type: 'USER_LOGIN',
      api: {
        endpoint: '/user/login',
        query: { username, password: hash }
      }
    }).then(body => {
      dispatch(updateToken(body.token));
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
  return updateToken('');
}
