'use strict';

const boom = require('boom');

module.exports = (logger, config, models) => {
  const users = require('./users')(logger, config, models.User);
  const days = require('./days')(logger, config, models.Day);
  const frontEnd = require('./static')(config);

  const apiDefault = [
    {
      path: '/api/{segments*}',
      method: 'GET',
      handler: () => {
        throw boom.notFound();
      }
    }
  ];

  return [
    ...users,
    ...days,
    ...apiDefault,
    ...frontEnd
  ];
};
