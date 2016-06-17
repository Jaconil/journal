'use strict';

const jwt = require('jsonwebtoken');

module.exports = (logger, config, db) => {
  return (request, reply) => {
    db.collection('user').findOne({
      username: request.payload.username,
      password: request.payload.password
    }, (err, user) => {
      if (err) {
        logger.error(err);
        return reply.badImplementation(err.errmsg);
      }

      if (!user) {
        return reply.badRequest('User not found');
      }

      return reply({
        token: jwt.sign({id: user.id}, config.jwtSecret, {
          expiresIn: config.jwtDuration
        })
      }).code(201);
    });
  };
}
