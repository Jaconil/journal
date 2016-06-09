'use strict';

const Winston = require('winston');

module.exports = function(options) {
  const logger = new Winston.Logger({
    transports: [
      new Winston.transports.Console(_.assign({
        colorize: true,
        timestamp: true,
        level: 'debug'
      }, options))
    ]
  });

  return logger;
};
