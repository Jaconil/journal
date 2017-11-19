'use strict';

/* eslint global-require: 0 */

module.exports = (state, fixtures) => {
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

  require('./users')(state, doLoginRequest, testRequest, fixtures);
  require('./days')(state, doLoginRequest, testRequest, fixtures);
  require('./public')(state);
};
