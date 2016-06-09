'use strict';

const HTTP_SERVER_ERROR = 500;
const HTTP_NOT_FOUND = 404;
const HTTP_SUCCESS = 200;

const TOKEN_DURATION = 1800; // 30mn

module.exports = (db, jwt, logger, config) => {
  return {
    login: (req, res) => {
      db.collection('user').findOne({
        username: req.query.username,
        password: req.query.password
      }, (err, user) => {
        if (err) {
          logger.error(err);
          return res.status(HTTP_SERVER_ERROR).json(err.errmsg);
        }

        if (!user) {
          return res.status(HTTP_NOT_FOUND).json('User not found');
        }

        return res.status(HTTP_SUCCESS).json({
          token: jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: TOKEN_DURATION
          })
        });
      });
    }
  };
};
