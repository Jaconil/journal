'use strict';

module.exports = (logger, config, db) => {

  return (request, reply) => {
    // build the db query
    const whereFilter = {
      $text: {
        $search: request.query.filter
      }
    };

    db.collection('day').find(whereFilter).sort({date: -1}).toArray((err, days) => {
      if (err) {
        logger.error(err);
        return reply.badImplementation(err.errmsg);
      }

      return reply(days);
    });
  };
};
