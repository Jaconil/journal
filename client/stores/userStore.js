'use strict';

import _ from 'lodash';
import crypto from 'crypto';

import BaseStore, { events as baseEvents } from './baseStore';

export var events = {
  LOGIN: 'user.login',
  CLEAR: 'user.clear'
};

class UserStore extends BaseStore {
  constructor() {
    super();
    this.register(this, events.LOGIN, this.login);
    this.register(this, events.CLEAR, this.clearToken);
    this.register(this, baseEvents.API_UNAUTHORIZED, this.clearToken);
  }

  clearToken() {
    this.setToken('');
    this.emitChange();
  }

  hasToken() {
    return this.getToken() !== '';
  }

  login(username, password) {
    var hash = crypto.createHash('sha256').update(password).digest('hex');

    this.fetchApi({
      path: '/user/login',
      query: {username: username, password: hash}
    }).then(response => {
      this.setToken(response.token);
    }).catch(() => {
      // do nothing for now
    }).finally(() => {
      this.emitChange();
    });
  }
}

export default new UserStore();
