'use strict';

const boom = require('boom');
const Moment = require('moment');
const MomentRange = require('moment-range');
const Op = require('sequelize').Op;

const moment = MomentRange.extendMoment(Moment);

const STATUSES = {
  notWritten: 'notWritten',
  written: 'written',
  draft: 'draft'
};

module.exports = (logger, config, Day) => {

  /**
   * Extracts and checks from, to and count dates parameters
   *
   * @param {object} request - Request
   * @returns {object} Object {fromDate, toDate}
   */
  function extractAndCheckDates(request) {
    const { from, to, count } = request.query;

    if (!from && !to) {
      throw boom.badRequest('No date given');
    }

    if ((!from && !count) || (!to && !count) || (from && to && count)) {
      throw boom.badRequest('Ambiguous parameters');
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
      throw boom.badRequest('Start date is after ending date');
    }

    return { fromDate, toDate };
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

    for (const day of range.by('days')) {
      list.push({
        date: day.format('YYYY-MM-DD'),
        status: STATUSES.notWritten
      });
    }

    return list;
  }

  return async request => {
    const { fromDate, toDate } = extractAndCheckDates(request);

    // Build a empty days list
    const listDays = buildListDays(fromDate, toDate);
    const statuses = request.query.status ? request.query.status.split(',') : null;

    // Build the db query
    const whereFilter = {
      date: {
        [Op.gte]: fromDate.format('YYYY-MM-DD'),
        [Op.lte]: toDate.format('YYYY-MM-DD')
      }
    };

    // Status filtering
    if (statuses && !_.includes(statuses, STATUSES.notWritten)) {
      whereFilter.status = { [Op.in]: statuses };
    }

    const days = await Day.findAll({ where: whereFilter });

    // Hydrate, filter and limit the results
    return _.chain(days)
      .map(day => _.set(day, 'date', moment(day.date).format('YYYY-MM-DD')))
      .unionBy(listDays, 'date')
      .sortBy('date')
      .filter(day => (!statuses || statuses.indexOf(day.status) !== -1))
      .map(day => _.pick(day, [
        'date',
        'content',
        'status'
      ]))
      .value();
  };
};
