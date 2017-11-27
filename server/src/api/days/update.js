'use strict';

const moment = require('moment');

module.exports = (logger, config, Day) => {
  return async request => {
    const day = {
      date: moment(request.params.date).format('YYYY-MM-DD'),
      content: request.payload.content,
      status: request.payload.status
    };

    await Day.upsert(day);
    return day;
  };
};
