'use strict';

global._ = require('lodash');

const config = require('./config');
const logger = require('./logger')();

const hapi = require('./hapi')(logger, config);

hapi.then(([server]) => {
  server.start();
  logger.info('Server running at:', server.info.uri);
}).catch(error => {
  logger.error('Server error:', error);
  throw error;
});
