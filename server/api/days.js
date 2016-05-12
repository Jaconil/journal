'use strict';

const FIRST_DAY = '2002-05-31';
const WRITING_START_HOUR = 12; // Writing allowed only after this hour

const HTTP_SERVER_ERROR = 500;
const HTTP_PARAM_ERROR = 400;
const HTTP_SUCCESS = 200;

const STATUSES = {
  notWritten: 'notWritten',
  written: 'written',
  draft: 'draft'
};

const moment = require('moment');

require('moment-range');

module.exports = (db, logger) => {

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

  return {
    /**
     * Get days
     *
     * Available filters:
     *   - from : YYYY-MM-DD, default to 2002-05-31 if omitted
     *   - to : YYYY-MM-DD, default to current day if omitted
     *   - count : associated to a date, selects only these days
     *   - status : written, notWritten, draft
     *   - limit: limits the number of days to display
     *
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {json} Array of days
     */
    find: (req, res) => {

      const count = _.parseInt(req.query.count);
      let fromDate = moment(req.query.from, 'YYYY-MM-DD').startOf('day');
      let toDate = moment(req.query.to, 'YYYY-MM-DD').startOf('day');
      const statuses = req.query.status ? req.query.status.split(',') : null;

      if (!req.query.from && !req.query.to) {
        return res.status(HTTP_PARAM_ERROR).json('No date given');
      }

      if (!fromDate.isValid() && req.query.from) {
        return res.status(HTTP_PARAM_ERROR).json('Invalid start date given');
      }

      if (!toDate.isValid() && req.query.to) {
        return res.status(HTTP_PARAM_ERROR).json('Invalid end date given');
      }

      if (!req.query.from) {
        fromDate = moment(FIRST_DAY, 'YYYY-MM-DD').startOf('day');

        if (count) {
          fromDate = moment(toDate).subtract(count, 'days');
        }
      }

      if (!req.query.to) {
        toDate = moment().startOf('day');

        if (count) {
          toDate = moment(fromDate).add(count, 'days');
        }
      }

      // Prevent today to appear before noon
      if (moment().diff(toDate, 'hours') < WRITING_START_HOUR) {
        toDate.subtract(1, 'day');
      }

      if (fromDate.isAfter(toDate)) {
        return res.status(HTTP_PARAM_ERROR).json('Start date is after ending date');
      }

      // build a empty days list
      let listDays = buildListDays(fromDate, toDate);
      const limit = req.query.limit || listDays.length;

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
          return res.status(HTTP_SERVER_ERROR).json(err.errmsg);
        }

        // hydrate the results
        _.each(days, day => {
          _.chain(listDays)
            .filter({ date: day.date })
            .first()
            .assign(day)
            .commit();
        });

        // filter the results
        if (statuses) {
          listDays = _.filter(listDays, day => {
            return statuses.indexOf(day.status) !== -1;
          });
        }

        // limit the results
        listDays = _.take(listDays, limit);

        if (req.query.summary && req.query.summary === '1') {
          return res.status(HTTP_SUCCESS).json({
            count: listDays.length
          });
        }

        return res.status(HTTP_SUCCESS).json(listDays);
      });
    },

    /**
     * Updates a day
     *
     * Payload should contain
     *   - content: Content of the day
     *   - status: written, notWritten
     *
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {json} Updated day
     */
    update: (req, res) => {
      const date = moment(req.params.date, 'YYYY-MM-DD').startOf('day');

      if (!date.isValid()) {
        return res.status(HTTP_PARAM_ERROR).json('Invalid date given');
      }

      if (!req.body || !req.body.content || !req.body.status) {
        return res.status(HTTP_PARAM_ERROR).json('Invalid payload');
      }

      const day = {
        date: req.params.date,
        content: req.body.content,
        status: req.body.status
      };

      db.collection('day').updateOne({ date: req.params.date }, day, { upsert: true }, err => {
        if (err) {
          logger.error(err);
          return res.status(HTTP_SERVER_ERROR).json(err.errmsg);
        }

        return res.status(HTTP_SUCCESS).json(day);
      });
    }
  };
};
