'use strict';

import request from 'superagent';
import when from 'when';

function fetchApi(options, token, dispatch) {
  var method = options.method || 'GET';
  var path = 'api' + options.path || '';

  var req = request(method, path).query({
    token: token
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
        dispatch({
          type: 'USER_UNAUTHORIZED'
        });
      }

      if (!err && response.ok) {
        resolve(response.body);
      } else {
        reject(err, response);
      }
    });
  });
}

function login(username, password) {
  return function(dispatch, getState) {
    var hash = crypto.createHash('sha256').update(password).digest('hex');
    var state = getState();

    fetchApi({
      path: '/user/login',
      query: { username: username, password: hash }
    }, state.user.token, dispatch).then(response => {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        token: response.token
      });
    }).catch(() => {
      dispatch({
        type: 'USER_LOGIN_FAILED'
      });
    });
  };
}

function login2(username, password) {
  var hash = crypto.createHash('sha256').update(password).digest('hex');
  return {
    api: {
      endpoint: '/user/login',
      query: { username: username, password: hash },
      types: ['USER_LOGIN', 'USER_LOGIN_SUCCESS', 'USER_LOGIN_ERROR']
    }
  };
}

export { login };
