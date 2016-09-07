'use strict';

const moment = require('moment');

require('moment-range');

const STATUSES = {
  notWritten: 'notWritten',
  written: 'written',
  draft: 'draft'
};

module.exports = (logger, config, db) => {

  /**
   * Extracts and checks from, to and count dates parameters
   * It could be
   *
   * @param {object} request - Request
   * @returns {object} Object {error, fromDate, toDate}
   */
  function extractAndCheckDates(request) {
    const { from, to, count } = request.query;

    if (!from && !to) {
      return { error: 'No date given' };
    }

    if (!from && !count || !to && !count || from && to && count) {
      return { error: 'Ambiguous parameters' };
    }

    let fromDate = moment(from, 'YYYY-MM-DD').startOf('day');
    let toDate = moment(to, 'YYYY-MM-DD').startOf('day');

    if (!from) {
      fromDate = moment(toDate).subtract(count - 1, 'days');
    }

    if (!to) {
      toDate = moment(fromDate).add(count - 1, 'days');
    }

    // Prevent today to appear before noon
    if (moment().diff(toDate, 'hours') < config.writingStartHour) {
      toDate.subtract(1, 'day');
    }

    if (fromDate.isAfter(toDate)) {
      return { error: 'Start date is after ending date' };
    }

    return { error: null, fromDate, toDate };
  }

  /**
   * Builds a list of notWritten days between 2 dates
   *
   * @param {date} start - Start date
   * @param {date} end   - End date
   * @returns {Array} Array of days
   */
  function buildListDays(start, end) {
    const list = [];
    const range = moment.range(start, end);

    range.by('days', day => {
      list.push({
        date: day.format('YYYY-MM-DD'),
        status: STATUSES.notWritten
      });
    });

    return list;
  }

  return (request, reply) => {
    const { error, fromDate, toDate } = extractAndCheckDates(request);

    if (error) {
      return reply.badRequest(error);
    }

    // build a empty days list
    let listDays = buildListDays(fromDate, toDate);
    const limit = request.query.limit || listDays.length;
    const statuses = request.query.status ? request.query.status.split(',') : null;

    // build the db query
    const whereFilter = {
      date: {
        $gte: fromDate.format('YYYY-MM-DD'),
        $lte: toDate.format('YYYY-MM-DD')
      }
    };

    // Status filtering
    if (statuses && !_.includes(statuses, STATUSES.notWritten)) {
      whereFilter.status = { $in: statuses };
    }

    db.collection('day').find(whereFilter).toArray((err, days) => {
      if (err) {
        logger.error(err);
        return reply.badImplementation(err.errmsg);
      }

      // hydrate, filter and limit the results
      listDays = _.chain(days)
        .unionBy(listDays, 'date')
        .sortBy('date')
        .filter(day => (!statuses || statuses.indexOf(day.status) !== -1))
        .take(limit)
        .value();

      return reply(listDays);
    });
  };
};