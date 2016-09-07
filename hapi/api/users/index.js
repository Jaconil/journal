'use strict';

module.exports = (logger, config, db) => {
  return {
    routes: require('./routes'),
    handlers: {
      'handler.api.users.login': require('./login')(logger, config, db)
    }
  };
};
