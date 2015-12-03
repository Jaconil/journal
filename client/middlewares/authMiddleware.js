'use strict';

import { pushState } from 'redux-router';

export default function(store) {
  return next => action => {
    if (action.type !== 'USER_CHECKAUTH') {
      return next(action);
    }

    const state = store.getState();

    if (state.user.token === '' && state.router.location.pathname !== '/login') {
      return next(pushState(null, '/login'));
    }
  };
}
