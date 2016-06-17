'use strict';

global._ = require('lodash');

const url = require('url');
const path = require('path');
const fs = require('fs');

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

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: config.port });

server.register([
  require('inert'),
  require('hapi-auth-jwt2'),
  require('hapi-boom-decorators')
]).then(() => {

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validateFunc: (decoded, request, callback) => callback(null, true),
    verifyOptions: { algorithms: ['HS256'] }
  });

  const api = require('./api')(logger, config, db);
  server.method(_.map(api.handlers, (method, name) => ({ name, method })));
  server.route(api.routes);

  // https://auth0.com/blog/2016/03/07/hapijs-authentication-secure-your-api-with-json-web-tokens/

  server.route({
    method: 'GET',
    path: '/{segments*}',
    handler: (request, reply) => {
      const staticPath = request.params.segments || '';

      fs.exists(path.resolve('public', staticPath), result => {
        const file = (result && staticPath) ? staticPath : 'index.html';
        return reply.file(path.resolve('public', file));
      });
    }
  });

  return server.start();
}).then(() => {
  logger.info('Server running at:', server.info.uri);
}).catch(error => {
  logger.error('Server error:', error);
  throw error;
});
