'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');

module.exports = (logger, config, oldDb, models) => {
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

    const api = require('./api/index')(logger, config, oldDb, models);

    server.method(_.map(api.handlers, (method, name) => ({ name, method })));
    server.route(api.routes);

    const defaultView = _.template(fs.readFileSync('public/index.html', 'utf8'))({ // eslint-disable-line no-sync
      baseUrl: config.baseUrl,
      firstDay: config.firstDay
    });

    server.route({
      method: 'GET',
      path: '/{segments*}',
      handler: (request, reply) => {
        const staticPath = request.params.segments || '';
        const staticFile = path.resolve('public', staticPath);

        fs.exists(staticFile, result => {
          return (result && staticPath) ? reply.file(staticFile) : reply(defaultView);
        });
      },
      config: {
        auth: false
      }
    });

    return server;
  });
};
