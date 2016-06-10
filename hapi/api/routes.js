'use strict';

const Joi = require('joi');

module.exports = [
  {
    path: '/api/users/login',
    method: 'POST',
    handler: 'handler.api.users.login',
    config: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    path: '/api/{segments*}',
    method: 'GET',
    handler: 'handler.api.default'
  }
];
