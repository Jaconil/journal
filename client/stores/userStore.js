'use strict';

import _ from 'lodash';
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

export var events = {
  LOGIN: 'user.login'
};

class UserStore extends EventEmitter {
  constructor() {
    super();

    this.token = null;

    Dispatcher.on('user.login', _.bind(this.login, this));
  }

  addChangeListener(callback) {
    this.addListener('user.change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('user.change', callback);
  }

  login(username, password) {
    console.log('store login', username, password);
    this.emit('user.change');
  }
}

export default new UserStore();
