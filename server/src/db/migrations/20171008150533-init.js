'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      CREATE TABLE "User" (
        "id"        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "username"  TEXT NOT NULL,
        "password"  TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      
      CREATE TABLE "DayStatus" (
        "id"        INTEGER PRIMARY KEY,
        "status"    TEXT NOT NULL
      );
      
      INSERT INTO "DayStatus" ("id", "status") VALUES (1, 'draft'), (2, 'written');
      
      CREATE TABLE "Day" (
        "id"        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "date"      DATE NOT NULL UNIQUE,
        "content"   TEXT NOT NULL,
        "statusId"  INTEGER NOT NULL REFERENCES "DayStatus"("id"),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP TABLE "Day";
      DROP TABLE "DayStatus";
      DROP TABLE "User";
    `);
  }
};
