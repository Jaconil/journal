'use strict';

var FIRST_DAY = '2002-05-31';

var STATUSES = {
  notWritten: 'notWritten',
  written: 'written'
};

var moment = require('moment');
require('moment-range');

module.exports = (db, logger) => {

  function buildListDays(start, end) {
    var list = [];
    var range = moment.range(start, end);

    range.by('days', function(day) {
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
     * @param req
     * @param res
     * @returns {*}
     */
    find: (req, res) => {

      var count = _.parseInt(req.query.count);
      var fromDate = moment(req.query.from, 'YYYY-MM-DD').startOf('day');
      var toDate = moment(req.query.to, 'YYYY-MM-DD').startOf('day');
      var status = req.query.status;

      if (!count && !req.query.from) {
        fromDate = moment(FIRST_DAY, 'YYYY-MM-DD').startOf('day');
      }

      if (!count && !req.query.to) {
        toDate = moment().startOf('day');
      }

      if (!fromDate.isValid() || !toDate.isValid()) {
        return res.status(400).json('Invalid date given');
      }

      if (fromDate.isAfter(toDate)) {
        return res.status(400).json('Start date is after ending date');
      }

      if (count && !toDate.isValid()) {
        toDate = moment(fromDate).add(count, 'days');
      }

      if (count && !fromDate.isValid()) {
        fromDate = moment(toDate).subtract(count, 'days');
      }

      // build a empty days list
      var listDays = buildListDays(fromDate, toDate);
      var limit = req.query.limit || listDays.length;

      // build the db query
      var whereFilter = {
        date: {
          '$gte': fromDate.format('YYYY-MM-DD'),
          '$lte': toDate.format('YYYY-MM-DD')
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
          var d = _.where(listDays, {date: day.date});
          _.assign(d[0], day);
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
        } else {
          return res.status(200).json(listDays);
        }
      });
    }
  };
};
