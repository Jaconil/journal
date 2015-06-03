'use strict';

var FIRST_DAY = '2002-05-31';

module.exports = function(db) {
  return {
    find: function (req, res) {
      var whereFilter = {};

      // From
      if (req.query.from) {
        whereFilter.id = whereFilter.id || {};
        whereFilter.id['>='] = req.query.from;
      }

      // To
      if (req.query.to) {
        whereFilter.id = whereFilter.id || {};
        whereFilter.id['<='] = req.query.to;
      }

      // Query
      if (req.query.count) {
        db.collection('day').count(whereFilter, (err, days) => {
          if (err) {
            return res.status(400).json('No matching days');
          }

          return res.status(200).json({
            startDate: FIRST_DAY,
            count: days
          });
        });
      } else {
        db.collection('day').find(whereFilter).toArray((err, days) => {
          if (err) {
            return res.status(400).json('No matching days');
          }

          return res.status(200).json({
            total: days.length,
            from: days[0]._id,
            to: days[days.length - 1]._id,
            results: days
          });
        });
      }
    }
  }
};
