'use strict';

const Joi = require('joi');

module.exports = (logger, config, Day) => {
  const handlers = {
    find: require('./find')(logger, config, Day),
    update: require('./update')(logger, config, Day),
    search: require('./search')(logger, config, Day)
  };

  return [
    {
      path: '/api/days',
      method: 'GET',
      handler: handlers.find,
      options: {
        validate: {
          query: {
            from: Joi.string().isoDate(),
            to: Joi.string().isoDate(),
            count: Joi.number().integer().positive(),
            status: Joi.string()
          }
        }
      }
    },
    {
      path: '/api/days/{date}',
      method: 'PUT',
      handler: handlers.update,
      options: {
        validate: {
          params: {
            date: Joi.string().isoDate().required()
          },
          payload: Joi.object({
            status: Joi.string().valid('draft', 'written').required(),
            content: Joi.when('status', {
              is: 'draft',
              then: Joi.string().allow('').required(),
              otherwise: Joi.string().min(1).required()
            })
          })
        }
      }
    },
    {
      path: '/api/days/search',
      method: 'GET',
      handler: handlers.search,
      options: {
        validate: {
          query: {
            from: Joi.string().isoDate(),
            to: Joi.string().isoDate(),
            filter: Joi.string().required()
          }
        }
      }
    }
  ];
};
