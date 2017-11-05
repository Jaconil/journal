'use strict';

module.exports = (logger, config, Day) => {
  return (request, reply) => {
    const day = {
      date: request.params.date,
      content: request.payload.content,
      status: request.payload.status
    };

    return Day.upsert(day)
      .then(() => reply(day))
      .catch(error => {
        logger.error(error);
        return reply.badImplementation(error.errmsg);
      });
  };
};
