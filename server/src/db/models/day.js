'use strict';

const Op = require('sequelize').Op;

module.exports = (db, DataTypes) => {
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
        this.setDataValue('statusId', value === 'draft' ? 1 : 2);
      },
      get() {
        return this.getDataValue('statusId') === 1 ? 'draft' : 'written'
      }
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeFind: (options) => {
        if (options.where && options.where.status) {
          options.where.statusId = {};
          options.where.statusId[Op.in] = _.map(options.where.status[Op.in], value => {
            return value === 'draft' ? 1 : 2;
          });

          delete options.where.status;
        }
      }
    }
  });
};
