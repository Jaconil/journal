'use strict';

const initialState = {
  token: sessionStorage.getItem('user.token') || '',
  nbLogin: 0
};

/**
 * Updates user state
 *
 * @param {object} state  - User state
 * @param {object} action - Action received
 * @returns {object} Updated state
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case 'USER_TOKEN_UPDATE':
      return _.assign({}, state, { token: action.payload.token });

    case 'USER_LOGIN_ERROR':
      return _.assign({}, state, { nbLogin: state.nbLogin + 1 });

    default:
      return state;
  }
}
