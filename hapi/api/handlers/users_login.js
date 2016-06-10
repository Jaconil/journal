'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');
//const User = require('../model/User');

const TOKEN_DURATION = 1800; // 30mn

module.exports = (logger, config, db, jwt) => {
  return (request, reply) => {
    db.collection('user').findOne({
      username: request.payload.username,
      password: request.payload.password
    }, (err, user) => {
      if (err) {
        logger.error(err);
        return reply(Boom.badImplementation(err.errmsg));
      }

      if (!user) {
        return reply(Boom.badRequest('User not found'));
      }

      return reply({
        token: jwt.sign({id: user.id}, config.jwtSecret, {
          expiresIn: TOKEN_DURATION
        })
      }).code(201);
    });
  };
}
