'use strict';

var Winston = require('winston');

module.exports = function(options) {
  var logger = new Winston.Logger({
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
