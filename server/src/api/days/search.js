'use strict';

const Op = require('sequelize').Op;

module.exports = (logger, config, Day) => {

  return (request, reply) => {
    // Build the db query
    const whereFilter = {
      content: {
        [Op.iLike]: '%' + request.query.filter + '%'
      }
    };

    return Day.findAll({ where: whereFilter, order: [['date', 'DESC']] })
      .then(days => {
        return reply(_.map(days, day => _.pick(day, ['date', 'content', 'status'])));
      })
      .catch(error => {
        logger.error(error);
        return reply.badImplementation(error.errmsg);
      });
  };
};
