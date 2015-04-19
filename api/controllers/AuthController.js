var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {

  login: function (req, res) {
    User
      .findOne({username: req.query.username, password: req.query.password})
      .then(function(user) {
        var token = jwt.encode({
          iss: user.id,
          exp: moment().add(30, 'minutes').valueOf()
        }, 'SecretKeyJournal');
         
        return res.json({
          token: token
        });
      })
      .catch(function(err) {
        return res.json(401, 'User not found');
      });
  }
  
};

