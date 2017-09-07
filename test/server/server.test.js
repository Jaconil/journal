'use strict';

global._ = require('lodash');

const sinon = require('sinon');

require('chai').should();

describe('Server', () => {

  const logger = {
    info: _.noop,
    error: _.noop
  };

  const config = {
    port: 8000,
    jwtSecret: 'abc',
    passwordSalt: 'salt'
  };

  const collections = {};

  const db = {
    collection: coll => {
      if (!collections[coll]) {
        collections[coll] = {
          findOne: sinon.stub().callsArgAsync(1),
          find: sinon.stub().returns({ toArray: cb => cb(null, []) }),
          updateOne: sinon.stub().callsArgAsync(3) // eslint-disable-line no-magic-numbers
        };
      }

      return collections[coll];
    }
  };

  const hapi = require('../../server/hapi')(logger, config, db);

  const state = {
    server: null,
    db,
    config,
    logger
  };

  before(() => hapi.then(srv => state.server = srv));

  after(() => state.server.stop());

  require('./public')(state);

  describe('/api', () => {
    require('./api')(state);
  });
});
