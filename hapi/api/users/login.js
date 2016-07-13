'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = (logger, config, db) => {
  return (request, reply) => {

    const hash = crypto
      .createHash('sha256')
      .update(config.passwordSalt + request.payload.password + config.passwordSalt)
      .digest('hex');

    db.collection('user').findOne({
      username: request.payload.username,
      password: hash
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
