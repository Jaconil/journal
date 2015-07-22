'use strict';

import { EventEmitter } from 'events';
import request from 'superagent';

import Dispatcher from '../dispatcher';

export var events = {
  API_UNAUTHORISED: 'api.unauthorized'
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

  fetchApi(options, callback) {
    var method = options.method || 'GET';
    var path = '/api' + options.path || '';

    var req = request(method, path);

    if (options.query) {
      req.query(options.query);
    }

    if (options.body) {
      req.send(options.body);
    }

    req.end(function(err, response) {
      if (response.unauthorized) {
        console.log('response 401');
        Dispatcher.emit('API_UNAUTHORISED');
      }

      callback(err, response);
    });
  }
}

export default BaseStore;
