'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const boom = require('boom');

const HTTP_CREATED = 201;

module.exports = (logger, config, User) => {
  return async (request, reply) => {
    const hash = crypto
      .createHash('sha256')
      .update(config.passwordSalt + request.payload.password + config.passwordSalt)
      .digest('hex');

    const user = await User.findOne({
      where: { username: request.payload.username, password: hash },
      attributes: ['id']
    });

    if (!user) {
      throw boom.badRequest('User not found');
    }

    return reply.response({
      token: jwt.sign({ id: user.id }, config.jwtSecret, {
        expiresIn: config.jwtDuration
      })
    }).code(HTTP_CREATED);
  };
};
