'use strict';

const Hapi = require('hapi');
const inert = require('inert');
const hapiJwt = require('hapi-auth-jwt2');

module.exports = async (logger, config) => {
  const server = Hapi.server({ port: config.port });

  await server.register([inert, hapiJwt]);

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validateFunc: () => ({ valid: true }),
    verifyOptions: { algorithms: ['HS256'] }
  });

  server.auth.default('jwt');

  const { db, models } = require('./db')(config);
  const api = require('./api/index')(logger, config, models);

  server.route(api);

  return [server, db];
};
