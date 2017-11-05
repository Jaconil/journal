'use strict';

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
module.exports = _.mapValues(defaultConfig, (defaultValue, key) => {
  const envValue = process.env[_.snakeCase(key).toUpperCase()]; // eslint-disable-line no-process-env

  const value = _.isUndefined(envValue) ? defaultValue : envValue;
  const origin = _.isUndefined(envValue) ? 'default' : 'env';

  if (value === null) {
    throw new Error('Env variable ' + key.toUpperCase() + ' is required but undefined');
  }

  logger.info(
    _.padEnd('config.' + key + ': ', 30), // eslint-disable-line no-magic-numbers
    _.padEnd('(' + origin + ')', 10), // eslint-disable-line no-magic-numbers
    JSON.stringify(value)
  );

  // Converts string-encapsuled int env variables into int
  return (value && !isNaN(value)) ? _.parseInt(value) : value;
});
