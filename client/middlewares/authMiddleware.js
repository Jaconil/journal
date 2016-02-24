'use strict';

import { push } from 'react-router-redux';

export default function(store) {
  return next => action => {
    if (action.type !== 'USER_CHECKAUTH') {
      return next(action);
    }

    const state = store.getState();

    if (state.user.token === '' && state.router.location.pathname !== '/login') {
      return next(push(null, '/login'));
    }
  };
}
