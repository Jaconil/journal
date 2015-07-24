'use strict';

import _ from 'lodash';
import request from 'superagent';
import crypto from 'crypto';

import BaseStore from './baseStore';
import Dispatcher from '../dispatcher';

export var events = {
  LOGIN: 'user.login'
};

class UserStore extends BaseStore {
  constructor() {
    super();
    Dispatcher.on(events.LOGIN, _.bind(this.login, this));
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

  isLogged() {
    return this.getToken() !== '';
  }
}

export default new UserStore();
