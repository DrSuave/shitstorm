(function() {
  var now;

  now = require('../../lib/performance-now');

  console.log(-(now() - now()).toFixed(3));

}).call(this);
