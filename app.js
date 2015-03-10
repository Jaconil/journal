(function() {
  var sails = require('sails');

  // Try to get `rc` dependency
  var rc = require('rc');

  // Start server
  sails.lift(rc('sails'));
})();
