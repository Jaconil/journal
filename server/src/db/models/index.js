'use strict';

const Sequelize = require('sequelize');

module.exports = db => {
  return {
    User: require('./user')(db, Sequelize),
    Day: require('./day')(db, Sequelize)
  };
};
