'use strict';

var moment = require('moment');

module.exports = (db, jwt, logger) => {
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

        var token = jwt.encode({
          iss: user.id,
          exp: moment().add(30, 'minutes').valueOf()
        }, 'SecretKeyJournal');

        return res.status(200).json({
          token: token
        });
      });
    }
  }
};
