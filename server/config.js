'use strict';

require('dotenv').load();

var defaultConfig = {
  port: 1337,

  dbHost: null,
  dbPort: null,
  dbName: null,
  dbUser: null,
  dbPassword: null,

  jwtSecret: 'secretKey'
};

// Env variables assignment
module.exports = _.mapValues(defaultConfig, (defaultValue, key) => {
  var snakeKey = _.snakeCase(key);
  var value = process.env['npm_config_' + snakeKey] || process.env[snakeKey.toUpperCase()] || defaultValue;

  if (value === null) {
    throw new Error('Env variable ' + key.toUpperCase() + ' is required but undefined');
  }

  return value;
});
