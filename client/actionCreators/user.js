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
    payload: { token }
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
  return dispatch => {
    return dispatch({
      type: 'USER_LOGIN',
      api: {
        method: 'POST',
        endpoint: '/users/login',
        body: { username, password }
      }
    })
    .then(body => {
      dispatch(updateToken(body.token));
    })
    .catch(_.noop);
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
