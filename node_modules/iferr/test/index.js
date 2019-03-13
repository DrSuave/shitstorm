(function() {
  var eq, iferr, invoke_fail, invoke_succ, ref, ref1, throw_error, throwerr, throws, tiferr;

  ref = require('../index.coffee'), iferr = ref.iferr, tiferr = ref.tiferr, throwerr = ref.throwerr;

  ref1 = require('assert'), eq = ref1.equal, throws = ref1.throws;

  invoke_fail = function(cb) {
    return cb(new Error('callback error'));
  };

  invoke_succ = function(cb) {
    return cb(null);
  };

  throw_error = function() {
    throw new Error('thrown');
  };

  describe('iferr', function() {
    it('calls the error callback on errors', function(done) {
      return invoke_fail(iferr(function(err) {
        eq(err.message, 'callback error');
        return done();
      }, function() {
        return done(new Error('shouldn\'t call the success callback'));
      }));
    });
    return it('calls the success callback on success', function(done) {
      return invoke_succ(iferr(function() {
        return done(new Error('shouldn\'t call the error callback'));
      }, done));
    });
  });

  describe('tiferr', function() {
    return it('catches errors in the success callback', function(done) {
      return invoke_succ(tiferr(function(err) {
        eq(err.message, 'thrown');
        return done();
      }, throw_error));
    });
  });

  describe('throwerr', function() {
    it('throws errors passed to the callback', function(done) {
      var err;
      try {
        return invoke_fail(throwerr(function() {
          return done('shouldn\'t call the success callback');
        }));
      } catch (error) {
        err = error;
        eq(err.message, 'callback error');
        return done();
      }
    });
    return it('delegates to the success callback otherwise', function(done) {
      return invoke_succ(throwerr(done));
    });
  });

}).call(this);
