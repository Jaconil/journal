'use strict';

module.exports = (db, DataTypes) => {
  return db.define('User', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    freezeTableName: true
  });
};
