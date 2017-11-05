'use strict';

global._ = require('lodash');

const config = require('./config');
const logger = require('./logger')();

// const oldDb = require('mongoskin').db(decodeURI(url.format({
//   protocol: 'mongodb',
//   slashes: true,
//   hostname: config.dbMongoHost,
//   port: config.dbMongoPort,
//   pathname: config.dbName,
//   auth: config.dbUser + ':' + config.dbPassword
// })));

const hapi = require('./hapi')(logger, config);

hapi.then(([server, db]) => {
  server.start();
  logger.info('Server running at:', server.info.uri);
}).catch(error => {
  logger.error('Server error:', error);
  throw error;
});
