'use strict';

import _ from 'lodash';
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

class AuthStore extends EventEmitter {
  constructor() {
    super();

    this.token = null;

    Dispatcher.on('auth.login', _.bind(this.login, this));
  }

  addChangeListener(callback) {
    this.addListener('auth.change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('auth.change', callback);
  }

  login(username, password) {
    console.log('store login', username, password);
    this.emit('auth.change');
  }
}

export default new AuthStore();
