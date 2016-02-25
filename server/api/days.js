'use strict';

var FIRST_DAY = '2002-05-31';

var STATUSES = {
  notWritten: 'notWritten',
  written: 'written'
};

var moment = require('moment');

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
    var list = [];
    var range = moment.range(start, end);

    range.by('days', (day) => {
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
     *   - status : written, notWritten
     *   - limit: limits the number of days to display
     *
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {json} Array of days
     */
    find: (req, res) => {

      var count = _.parseInt(req.query.count);
      var fromDate = moment(req.query.from, 'YYYY-MM-DD').startOf('day');
      var toDate = moment(req.query.to, 'YYYY-MM-DD').startOf('day');
      var status = req.query.status;

      if (!req.query.from && !req.query.to) {
        return res.status(400).json('No date given');
      }

      if (!fromDate.isValid() && req.query.from) {
        return res.status(400).json('Invalid start date given');
      }

      if (!toDate.isValid() && req.query.to) {
        return res.status(400).json('Invalid end date given');
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
      if (moment().diff(toDate, 'hours') < 12) {
        toDate.subtract(1, 'day');
      }

      if (fromDate.isAfter(toDate)) {
        return res.status(400).json('Start date is after ending date');
      }

      // build a empty days list
      var listDays = buildListDays(fromDate, toDate);
      var limit = req.query.limit || listDays.length;

      // build the db query
      var whereFilter = {
        date: {
          $gte: fromDate.format('YYYY-MM-DD'),
          $lte: toDate.format('YYYY-MM-DD')
        }
      };

      if (status && status !== STATUSES.notWritten) {
        whereFilter.status = status;
      }

      db.collection('day').find(whereFilter).toArray((err, days) => {
        if (err) {
          logger.error(err);
          return res.status(500).json(err.errmsg);
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
        if (status) {
          listDays = _.filter(listDays, {
            status: status
          });
        }

        // limit the results
        listDays = _.take(listDays, limit);

        if (req.query.summary && req.query.summary === '1') {
          return res.status(200).json({
            count: listDays.length
          });
        }

        return res.status(200).json(listDays);
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
      var date = moment(req.params.date, 'YYYY-MM-DD').startOf('day');

      if (!date.isValid()) {
        return res.status(400).json('Invalid date given');
      }

      if (!req.body || !req.body.content || !req.body.status) {
        return res.status(400).json('Invalid payload');
      }

      var day = {
        date: req.params.date,
        content: req.body.content,
        status: req.body.status
      };

      db.collection('day').updateOne({ date: req.params.date }, day, { upsert: true }, function(err) {
        if (err) {
          logger.error(err);
          return res.status(500).json(err.errmsg);
        }

        return res.status(200).json(day);
      });
    }
  };
};
