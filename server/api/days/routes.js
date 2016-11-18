'use strict';

const Joi = require('joi');

module.exports = [
  {
    path: '/api/days',
    method: 'GET',
    handler: 'handler.api.days.find',
    config: {
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
    handler: 'handler.api.days.update',
    config: {
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
    handler: 'handler.api.days.search',
    config: {
      validate: {
        query: {
          from: Joi.string().isoDate(),
          to: Joi.string().isoDate(),
          filter: Joi.string().required()
        }
      }
    }
  },
];
