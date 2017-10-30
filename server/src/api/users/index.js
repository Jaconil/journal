'use strict';

module.exports = (logger, config, User) => {
  return {
    routes: require('./routes'),
    handlers: {
      'handler.api.users.login': require('./login')(logger, config, User)
    }
  };
};
