var FIRST_DAY = '2002-05-31';

module.exports = {

  _config: {
    pluralize: true
  },

  /**
   * ?from
   * ?to
   * ?limit
   * ?count
   * ?filter
   */
  find: function(req, res) {
    
    var whereFilter = {};
    var method = (req.query.count) ? 'count' : 'find';
    
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
    
    // Limit
    
    
    
    var jsonResult = {};

    Day[method]()
      .where(whereFilter)
      .then(function(days) {
        if (req.query.count) {
          jsonResult = {
            startDate: FIRST_DAY,
            count: days
          };
        }
        else {
          jsonResult = {
            total: days.length,
            from: days[0].id,
            to: days[days.length - 1].id,
            results: days
          };
        }

        return res.json(jsonResult);
      })
      .catch(function(err) {
        console.log(err);
        return res.json(400, 'No matching days');
      });
  }

};
