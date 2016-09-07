'use strict';

global._ = require('lodash');

const url = require('url');

const config = require('./config');
const logger = require('./logger')();
const db = require('mongoskin').db(decodeURI(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})));

const hapi = require('./hapi')(logger, config, db);

hapi.then(server => {
  server.start();
  logger.info('Server running at:', server.info.uri);
}).catch(error => {
  logger.error('Server error:', error);
  throw error;
});
