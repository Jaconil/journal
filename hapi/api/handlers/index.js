'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');

module.exports = (logger, config, db) => {
  return {
    'api.users.login': require('./users_login')(logger, config, db),

    'api.default': (request, reply) => reply(Boom.notFound())
  };
};
