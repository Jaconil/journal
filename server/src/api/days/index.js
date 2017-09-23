'use strict';

module.exports = (logger, config, db) => {
  return {
    routes: require('./routes'),
    handlers: {
      'handler.api.days.find': require('./find')(logger, config, db),
      'handler.api.days.update': require('./update')(logger, config, db),
      'handler.api.days.search': require('./search')(logger, config, db)
    }
  };
};
