'use strict';

module.exports = (db, jwt, logger, config) => {
  return {
    login: (req, res) => {
      db.collection('user').findOne({
        username: req.query.username,
        password: req.query.password
      }, (err, user) => {
        if (err) {
          logger.error(err);
          return res.status(500).json(err.errmsg);
        }

        if (!user) {
          return res.status(401).json('User not found');
        }

        return res.status(200).json({
          token: jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresInMinutes: 30
          })
        });
      });
    }
  };
};
