'use strict';

module.exports = (db, DataTypes) => {
  return db.define('Day', {
    date: DataTypes.DATEONLY,
    content: DataTypes.TEXT,
    status: DataTypes.ENUM('draft', 'written')
  }, {
    freezeTableName: true
  });
};
