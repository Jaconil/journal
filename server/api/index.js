'use strict';

var jwt = require('jsonwebtoken');

module.exports = (express, db, logger, config) => {
  var router = express.Router();

  var checkToken = require('./middlewares/checkToken')(jwt, logger, config);

  var user = require('./user')(db, jwt, logger, config);
  var days = require('./days')(db, logger);

  router.get('/user/login', user.login);

  router.use(checkToken);
  router.get('/days', days.find);

  return router;
};
