'use strict';

import crypto from 'crypto';

function login(username, password) {
  var hash = crypto.createHash('sha256').update(password).digest('hex');
  return {
    type: 'USER_LOGIN',
    api: {
      endpoint: '/user/login',
      query: { username: username, password: hash }
    }
  };
}

export { login };
