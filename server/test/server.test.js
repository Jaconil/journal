'use strict';

global._ = require('lodash');

require('chai').should();

describe('Server', () => {

  const logger = {
    info: _.noop,
    error: _.noop
  };

  const config = require('../src/config');
  const hapi = require('../src/hapi')(logger, config);

  const state = {
    server: null,
    db: null,
    config,
    logger
  };

  const fixtures = require('./fixtures')(state);

  before(() => hapi.then(([srv, db]) => {
    state.server = srv;
    state.db = db;
  }));

  after(() => state.server.stop());

  describe('/api', () => require('./api')(state, fixtures));
});
