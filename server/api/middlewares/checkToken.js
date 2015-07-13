'use strict';

module.exports = function(jwt, logger, config) {
  return function(req, res, next) {
    var token = (req.body && req.body.token) || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.jwt_secret, function(err, decoded) {
        if (err) {
          logger.error(err);
          return res.status(403).json('Invalid token');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send('No token provided');
    }
  }
};
