'use strict';

var defaultConfig = {
  port: 1337,
  db_host: null,
  db_port: null,
  db_name: null,
  db_user: null,
  db_password: null
};

// Env variables assignment
module.exports = _.mapValues(defaultConfig, (defaultValue, key) => {
  var value = process.env['npm_config_' + key] || process.env[key.toUpperCase()] || defaultValue;

  if (value === null) {
    throw new Error('Env variable ' + key.toUpperCase() + ' is required but undefined');
  }

  return value;
});
