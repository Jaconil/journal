'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const HTTP_CREATED = 201;

module.exports = (logger, config, User) => {
  return (request, reply) => {

    const hash = crypto
      .createHash('sha256')
      .update(config.passwordSalt + request.payload.password + config.passwordSalt)
      .digest('hex');

    User.findOne({
      where: { username: request.payload.username, password: hash },
      attributes: ['id']
    })
    .then(user => {
      if (!user) {
        return reply.badRequest('User not found');
      }

      return reply({
        token: jwt.sign({ id: user.id }, config.jwtSecret, {
          expiresIn: config.jwtDuration
        })
      }).code(HTTP_CREATED);
    })
    .catch(error => {
      logger.error(error);
      return reply.badImplementation(error.errmsg);
    });
  };
};
