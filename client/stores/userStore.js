'use strict';

import _ from 'lodash';
import request from 'superagent';
import crypto from 'crypto';

import BaseStore, { events as baseEvents } from './baseStore';
import Dispatcher from '../dispatcher';

export var events = {
  LOGIN: 'user.login',
  CLEAR: 'user.clear'
};

class UserStore extends BaseStore {
  constructor() {
    super();
    Dispatcher.on(events.LOGIN, _.bind(this.login, this));
    Dispatcher.on(events.CLEAR, _.bind(this.clearToken, this));
    Dispatcher.on(baseEvents.API_UNAUTHORIZED, _.bind(this.clearToken, this));
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
