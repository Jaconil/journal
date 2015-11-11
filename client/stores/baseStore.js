'use strict';

import { EventEmitter } from 'events';
import request from 'superagent';
import when from 'when';
import _ from 'lodash';

import dispatcher from '../dispatcher';

export var events = {
  API_UNAUTHORIZED: 'api.unauthorized'
};

class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  register(currentStore, event, handler) {
    dispatcher.on(event, handler.bind(currentStore));
  }

  addChangeListener(callback, context) {
    var event = _(['change', context]).compact().join('.');

    this.addListener(event, callback);
  }

  removeChangeListener(callback, context) {
    var event = _(['change', context]).compact().join('.');

    this.removeListener(event, callback);
  }

  emitChange(context) {
    var event = _(['change', context]).compact().join('.');

    this.emit(event);
  }

  setToken(token) {
    sessionStorage.setItem('api.token', token);
  }

  getToken() {
    return sessionStorage.getItem('api.token') || '';
  }

  fetchApi(options) {
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

    return when.promise(function(resolve, reject) {
      req.end(function(err, response) {
        if (response.unauthorized) {
          dispatcher.emit(events.API_UNAUTHORIZED);
        }

        if (!err && response.ok) {
          resolve(response.body);
        } else {
          reject(err, response);
        }
      });
    });
  }
}

export default BaseStore;
