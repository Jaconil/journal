'use strict';

import _ from 'lodash';
import BaseStore from './baseStore';
import Dispatcher from '../dispatcher';

export var events = {
  LOGIN: 'user.login'
};

class UserStore extends BaseStore {
  constructor() {
    super();

    this.token = null;

    Dispatcher.on(events.LOGIN, _.bind(this.login, this));
  }

  login(username, password) {
    console.log('store login', username, password);
    this.emitChange();
  }

  isLogged() {
    return this.token !== null;
  }
}

export default new UserStore();
