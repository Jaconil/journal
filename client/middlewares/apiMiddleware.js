'use strict';

/* eslint callback-return: 0 */

import request from 'superagent';

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

    next({ type: action.type });

    return new Promise((resolve, reject) => {
      req.end((err, response) => {
        next({ type: action.type + '_RESPONSE', payload: response });

        if (err || !response.ok) {
          next({ type: action.type + '_ERROR', error: err });
          return reject(err);
        }

        next({ type: action.type + '_SUCCESS', payload: response.body });
        return resolve(response);
      });
    });
  };
}
