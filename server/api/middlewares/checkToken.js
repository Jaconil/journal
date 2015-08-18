'use strict';

module.exports = (jwt, logger, config) => {
  return (req, res, next) => {
    var token = (req.body && req.body.token) || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
          return res.status(401).json('Invalid token');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).send('No token provided');
    }
  }
};
