'use strict';

var jwt = require('jwt-simple');

module.exports = function(express, db) {
  var router = express.Router();

  var auth = require('./auth')(db, jwt);
  var days = require('./days')(db);

  router.get('/auth/login', auth.login);
  router.get('/days', days.find);

  return router;
};
