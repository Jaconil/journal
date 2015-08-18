'use strict';

import _ from 'lodash';
import crypto from 'crypto';

import BaseStore, { events as baseEvents } from './baseStore';
import dispatcher from '../dispatcher';

export var events = {
  LOGIN: 'user.login',
  CLEAR: 'user.clear'
};

class UserStore extends BaseStore {
  constructor() {
    super();
    dispatcher.on(events.LOGIN, _.bind(this.login, this));
    dispatcher.on(events.CLEAR, _.bind(this.clearToken, this));
    dispatcher.on(baseEvents.API_UNAUTHORIZED, _.bind(this.onUnauthorizedApiCall, this));
  }

  //setToken(token) {
  //  super.setToken(token);
  //  this.emitChange();
  //}

  clearToken() {
    this.setToken('');
    this.emitChange();
  }

  hasToken() {
    return this.getToken() !== '';
  }

  onUnauthorizedApiCall() {
    if (this.hasToken()) {
      this.clearToken();
    }
  }

  login(username, password) {
    var hash = crypto.createHash('sha256').update(password).digest('hex');

    this.fetchApi({
      path: '/user/login',
      query: {username: username, password: hash}
    }, function(err, response) {
      if (response.ok) {
        this.setToken(response.body.token);
      }

      this.emitChange();
    }.bind(this));
  }
}

export default new UserStore();
