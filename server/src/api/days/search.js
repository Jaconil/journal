'use strict';

const Op = require('sequelize').Op;

module.exports = (logger, config, Day) => {
  return async request => {
    const days = await Day.findAll({
      where: {
        content: {
          [Op.iLike]: '%' + request.query.filter + '%'
        }
      },
      order: [['date', 'DESC']]
    });

    return _.map(days, day => _.pick(day, [
      'date',
      'content',
      'status'
    ]));
  };
};
