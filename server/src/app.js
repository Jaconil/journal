'use strict';

global._ = require('lodash');

const url = require('url');

const config = require('./config');
const logger = require('./logger')();
const oldDb = require('mongoskin').db(decodeURI(url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: config.dbMongoHost,
  port: config.dbMongoPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})));

const Sequelize = require('sequelize');
const db = new Sequelize(decodeURI(url.format({
  protocol: 'postgres',
  slashes: true,
  hostname: config.dbHost,
  port: config.dbPort,
  pathname: config.dbName,
  auth: config.dbUser + ':' + config.dbPassword
})), {
  operatorsAliases: false
});

const models = require('./db/models')(db);
const hapi = require('./hapi')(logger, config, oldDb, models);

hapi.then(server => {
  server.start();
  logger.info('Server running at:', server.info.uri);
}).catch(error => {
  logger.error('Server error:', error);
  throw error;
});
