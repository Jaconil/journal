'use strict';

module.exports = (logger, config, Day) => {
  return {
    routes: require('./routes'),
    handlers: {
      'handler.api.days.find': require('./find')(logger, config, Day),
      'handler.api.days.update': require('./update')(logger, config, Day),
      'handler.api.days.search': require('./search')(logger, config, Day)
    }
  };
};
