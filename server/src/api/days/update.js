'use strict';

module.exports = (logger, config, db) => {
  return (request, reply) => {
    const day = {
      date: request.params.date,
      content: request.payload.content,
      status: request.payload.status
    };

    db.collection('day').updateOne({ date: request.params.date }, day, { upsert: true }, err => {
      if (err) {
        logger.error(err);
        return reply.badImplementation(err.errmsg);
      }

      return reply(day);
    });
  };
};
