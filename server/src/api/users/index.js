'use strict';

const Joi = require('joi');

module.exports = (logger, config, User) => {
  const handlers = {
    login: require('./login')(logger, config, User)
  };

  return [
    {
      path: '/api/users/login',
      method: 'POST',
      handler: handlers.login,
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
          })
        },
        auth: false
      }
    }
  ];
};
