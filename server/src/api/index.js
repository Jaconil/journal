'use strict';

module.exports = (logger, config, oldDb, models) => {
  const users = require('./users/index')(logger, config, models.User);
  const days = require('./days/index')(logger, config, oldDb, models);

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
