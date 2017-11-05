'use strict';

/* eslint global-require: 0 */

const crypto = require('crypto');

module.exports = state => {

  /**
   * Creates a fake user
   *
   * @param {string} username - User login
   * @param {string} password - User password
   */
  function createUser(username, password) {
    return state.db.queryInterface
      .bulkInsert('User', [{
        username,
        password: crypto
          .createHash('sha256')
          .update(state.config.passwordSalt + password + state.config.passwordSalt)
          .digest('hex')
      }]);
  }

  /**
   * Requests /api/users/login
   *
   * @param {string} username - User login
   * @param {string} password - User password
   * @returns {Promise} Resolves if successful
   */
  function doLoginRequest(username, password) {
    const payload = (username || password) ? { payload: { username, password } } : null;

    return state.server.inject(_.assign(payload, {
      method: 'POST',
      url: '/api/users/login'
    }));
  }

  /**
   * Tests request status code
   *
   * @param {Promise} request        - Request
   * @param {int} expectedStatusCode - Expected status code
   * @returns {Promise} Resolves if successful
   */
  function testRequest(request, expectedStatusCode) {
    return request
      .then(response => {
        response.statusCode.should.equal(expectedStatusCode);
        return response.result;
      });
  }

  require('./users')(state, createUser, doLoginRequest, testRequest);
  require('./days')(state, createUser, doLoginRequest, testRequest);
};
