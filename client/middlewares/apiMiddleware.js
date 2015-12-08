'use strict';

/* eslint callback-return: 0 */

import request from 'superagent';

import { pushState } from 'redux-router';

/**
 * Middleware to fetch api
 * Actions should match:
 * {
 *   type: <string>
 *   api: {
 *     endpoint: <string>,
 *     query: <object>,
 *     success: <action>
 *   }
 * }
 *
 * @param {object} store - Redux store
 * @returns {Function} Action
 */
export default function(store) {
  return next => action => {
    if (!action.api) {
      return next(action);
    }

    var method = action.api.method || 'GET';
    var path = 'api' + action.api.endpoint || '';

    var req = request(method, path).query({
      token: store.getState().user.token
    });

    if (action.api.query) {
      req.query(action.api.query);
    }

    if (action.api.body) {
      req.send(action.api.body);
    }

    req.end(function(err, response) {
      next({
        type: action.type + '_RESPONSE',
        payload: response
      });

      if (response.unauthorized) {
        return next(pushState(null, '/login'));
      }

      if (!err && response.ok) {
        next({
          type: action.type + '_SUCCESS',
          payload: response.body
        });

        if (action.api.success) {
          next(action.api.success);
        }
      } else {
        next({
          type: action.type + '_ERROR',
          error: err
        });
      }
    });

    next({
      type: action.type
    });
  };
}
