'use strict';

var initialState = {
  token: sessionStorage.getItem('user.token') || '',
  nbLogin: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'USER_UNAUTHORIZED':
    case 'USER_LOGOUT':
      sessionStorage.setItem('user.token', '');
      return _.assign({}, state, { token: '' });

    case 'USER_LOGIN_ERROR':
      return _.assign({}, state, { nbLogin: state.nbLogin + 1 });

    case 'USER_LOGIN_SUCCESS':
      sessionStorage.setItem('user.token', action.payload.token);
      return _.assign({}, state, { token: action.payload.token });

    default:
      return state;
  }
}
