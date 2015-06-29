'use strict';

var jwt = require('jwt-simple');

module.exports = (express, db, logger) => {
  var router = express.Router();

  var auth = require('./auth')(db, jwt, logger);
  var days = require('./days')(db, logger);

  router.get('/auth/login', auth.login);
  router.get('/days', days.find);

  return router;
};
