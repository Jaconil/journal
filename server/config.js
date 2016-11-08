'use strict';

require('dotenv').load();

const logger = require('./logger')();

const defaultConfig = {
  baseUrl: '',
  port: 1337,

  dbHost: null,
  dbPort: null,
  dbName: null,
  dbUser: null,
  dbPassword: null,

  passwordSalt: null,

  jwtSecret: 'secretKey',
  jwtDuration: 1800, // 30mn

  writingStartHour: 12, // noon
  firstDay: null
};

// Env variables assignment
module.exports = _.mapValues(defaultConfig, (value, key) => {
  const envValue = process.env[_.snakeCase(key).toUpperCase()];
  let origin = 'default';

  value = _.isUndefined(envValue) ? value : envValue;
  origin = _.isUndefined(envValue) ? origin : 'env';

  if (value === null) {
    throw new Error('Env variable ' + key.toUpperCase() + ' is required but undefined');
  }

  logger.info(
    _.padEnd('config.' + key + ': ', 30),
    _.padEnd('(' + origin + ')', 10),
    JSON.stringify(value)
  );

  // Converts string-encapsuled int env variables into int
  return (value && !isNaN(value)) ? _.parseInt(value) : value;
});
