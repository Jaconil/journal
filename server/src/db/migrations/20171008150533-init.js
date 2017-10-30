'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)
    .then(queryInterface.sequelize.query(`
      CREATE TABLE "User" (
        "id"        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "username"  TEXT NOT NULL,
        "password"  TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `))
    .then(queryInterface.sequelize.query(`
      CREATE TABLE "Day" (
        "id"        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "date"      DATE NOT NULL UNIQUE,
        "content"   TEXT NOT NULL,
        "status"    TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `));
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "Day";
    `)
    .then(queryInterface.sequelize.query(`
      DROP TABLE "User";
    `))
    .then(queryInterface.sequelize.query(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `));
  }
};
