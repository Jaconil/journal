'use strict';

global._ = require('lodash');

const config = require('./config');
const logger = require('./logger')();

const hapi = require('./hapi');

(async () => {
  try {
    const [server] = await hapi(logger, config);
    await server.start();
    logger.info('Server running at:', server.info.uri);
  } catch (error) {
    logger.error('Server error');
    logger.error(error);
  }
})();
