'use strict';

const Op = require('sequelize').Op;

module.exports = (db, DataTypes) => {

  const statusMapping = {
    'draft': 1,
    'written': 2
  };
  const invertedStatusMapping = _.invert(statusMapping);

  return db.define('Day', {
    date: {
      type: DataTypes.DATEONLY,
      unique: true
    },
    content: DataTypes.TEXT,
    statusId: DataTypes.INTEGER,
    status: {
      type: DataTypes.VIRTUAL,
      set(value) {
        this.setDataValue('status', value);
        this.setDataValue('statusId', _.get(statusMapping, value));
      },
      get() {
        return _.get(invertedStatusMapping, this.getDataValue('statusId'));
      }
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeFind: (options) => {
        if (options.where && options.where.status) {
          options.where.statusId = {};
          options.where.statusId[Op.in] = _.map(options.where.status[Op.in], value => {
            return _.get(statusMapping, value);
          });

          delete options.where.status;
        }
      }
    }
  });
};
