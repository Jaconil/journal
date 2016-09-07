'use strict';

const crypto = require('crypto');

module.exports = state => {

  /**
   * Creates a fake user
   *
   * @param {int}    id       - User id
   * @param {string} username - User login
   * @param {string} password - User password
   * @returns {object} New User { id, username, password, hash }
   */
  function createUser(id, username, password) {
    const user = {
      id,
      username,
      password,
      hash: crypto
        .createHash('sha256')
        .update(state.config.passwordSalt + password + state.config.passwordSalt)
        .digest('hex')
    };

    state.db.collection('user').findOne.withArgs({ username, password: user.hash }).callsArgWithAsync(1, null, user);

    return user;
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
