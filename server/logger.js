'use strict';

const Winston = require('winston');

module.exports = options => {
  return new Winston.Logger({
    transports: [
      new Winston.transports.Console(_.assign({
        colorize: true,
        timestamp: true,
        level: 'debug'
      }, options))
    ]
  });
};
