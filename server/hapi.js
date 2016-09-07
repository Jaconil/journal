'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');

module.exports = (logger, config, db) => {
  const server = new Hapi.Server();

  server.connection({ port: config.port });

  return server.register([
    require('inert'),
    require('hapi-auth-jwt2'),
    require('hapi-boom-decorators')
  ]).then(() => {
    server.auth.strategy('jwt', 'jwt', 'required', {
      key: config.jwtSecret,
      validateFunc: (decoded, request, callback) => callback(null, true),
      verifyOptions: { algorithms: ['HS256'] }
    });

    const api = require('./api')(logger, config, db);
    server.method(_.map(api.handlers, (method, name) => ({ name, method })));
    server.route(api.routes);

    server.route({
      method: 'GET',
      path: '/{segments*}',
      handler: (request, reply) => {
        const staticPath = request.params.segments || '';

        fs.exists(path.resolve('public', staticPath), result => {
          const file = (result && staticPath) ? staticPath : 'index.html';
          return reply.file(path.resolve('public', file));
        });
      },
      config: {
        auth: false
      }
    });

    return server;
  });
};
