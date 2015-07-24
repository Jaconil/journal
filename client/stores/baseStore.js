'use strict';

import { EventEmitter } from 'events';
import request from 'superagent';

class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  addChangeListener(callback) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  emitChange() {
    this.emit('change');
  }

  setToken(token) {
    sessionStorage.setItem('api.token', token);
  }

  getToken() {
    return sessionStorage.getItem('api.token') || '';
  }

  clearToken() {
    this.setToken('');
    this.emitChange();
  }

  fetchApi(options, callback) {
    var method = options.method || 'GET';
    var path = 'api' + options.path || '';

    var req = request(method, path).query({
      key: this.getToken()
    });

    if (options.query) {
      req.query(options.query);
    }

    if (options.body) {
      req.send(options.body);
    }

    req.end(function(err, response) {
      if (response.unauthorized) {
        this.clearToken();
      }

      callback(err, response);
    }.bind(this));
  }
}

export default BaseStore;
