'use strict';

global._ = require('lodash');

const sinon = require('sinon');

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

  before(() => hapi.then(([srv, db]) => {
    state.server = srv;
    state.db = db;
  }));

  after(() => state.server.stop());

  require('./public')(state);

  describe('/api', () => require('./api')(state));
});
