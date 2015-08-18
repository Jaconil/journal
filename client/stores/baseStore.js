'use strict';

import { EventEmitter } from 'events';
import request from 'superagent';

import dispatcher from '../dispatcher';

export var events = {
  API_UNAUTHORIZED: 'api.unauthorized'
};

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

  fetchApi(options, callback) {
    var method = options.method || 'GET';
    var path = 'api' + options.path || '';

    var req = request(method, path).query({
      token: this.getToken()
    });

    if (options.query) {
      req.query(options.query);
    }

    if (options.body) {
      req.send(options.body);
    }

    req.end(function(err, response) {
      if (response.unauthorized) {
        dispatcher.emit(events.API_UNAUTHORIZED);
      }

      callback(err, response);
    }.bind(this));
  }
}

export default BaseStore;
