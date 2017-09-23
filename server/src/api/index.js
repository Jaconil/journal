'use strict';

module.exports = (logger, config, db) => {
  const users = require('./users/index')(logger, config, db);
  const days = require('./days/index')(logger, config, db);

  const apiDefault = {
    routes: [
      {
        path: '/api/{segments*}',
        method: 'GET',
        handler: 'handler.api.default'
      }
    ],
    handlers: {
      'handler.api.default': (request, reply) => reply.notFound()
    }
  };

  return {
    routes: [
      ...users.routes,
      ...days.routes,
      ...apiDefault.routes
    ],
    handlers: _.assign(
      users.handlers,
      days.handlers,
      apiDefault.handlers
    )
  };
};
