'use strict';

import crypto from 'crypto';

import { pushState } from 'redux-router';

/**
 * Login a given user
 *
 * @param {string} username - User login
 * @param {string} password - User password
 * @returns {object} Action
 */
function login(username, password) {
  var hash = crypto.createHash('sha256').update(password).digest('hex');

  return {
    type: 'USER_LOGIN',
    api: {
      endpoint: '/user/login',
      query: { username: username, password: hash },
      success: pushState(null, '/write')
    }
  };
}

/**
 * Logout the current user
 *
 * @returns {object} Action
 */
function logout() {
  return {
    type: 'USER_LOGOUT'
  };
}

/**
 * Checks the current user auth
 *
 * @returns {object} Action
 */
function checkAuth() {
  return {
    type: 'USER_CHECKAUTH'
  };
}

export { login, logout, checkAuth };
