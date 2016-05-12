'use strict';

const jwt = require('jsonwebtoken');

module.exports = (express, db, logger, config) => {
  const router = new express.Router();

  const checkToken = require('./middlewares/checkToken')(jwt, logger, config);

  const user = require('./user')(db, jwt, logger, config);
  const days = require('./days')(db, logger);

  router.get('/user/login', user.login);

  router.use(checkToken);
  router.get('/days', days.find);
  router.put('/days/:date', days.update);

  return router;
};
