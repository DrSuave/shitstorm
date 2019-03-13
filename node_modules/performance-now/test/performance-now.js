(function() {
  var Bluebird, assert, chai, expect, getUptime, now;

  chai = require("chai");

  chai.use(require("chai-increasing"));

  assert = chai.assert, expect = chai.expect;

  Bluebird = require("bluebird");

  now = require("../");

  getUptime = function() {
    return process.uptime() * 1e3;
  };

  describe("now", function() {
    it("reported time differs at most 1ms from a freshly reported uptime", function() {
      return assert.isAtMost(Math.abs(now() - getUptime()), 1);
    });
    it("two subsequent calls return an increasing number", function() {
      return assert.isBelow(now(), now());
    });
    it("has less than 10 microseconds overhead", function() {
      return assert.isBelow(Math.abs(now() - now()), 0.010);
    });
    it("can be called 1 million times in under 1 second (averaging under 1 microsecond per call)", function() {
      var i;
      this.timeout(1000);
      for (i = 0; i < 1000000; i++) {
        now();
      }
      return void 0;
    });
    it("for 10,000 numbers, number n is never bigger than number n-1", function() {
      var stamps;
      stamps = (function() {
        var i, results;
        results = [];
        for (i = 1; i < 10000; i++) {
          results.push(now());
        }
        return results;
      })();
      return expect(stamps).to.be.increasing;
    });
    it("shows that at least 0.2 ms has passed after a timeout of 1 ms", function() {
      var earlier;
      earlier = now();
      return Bluebird.resolve().delay(1).then(function() {
        return assert.isAbove(now() - earlier, 0.2);
      });
    });
    it("shows that at most 3 ms has passed after a timeout of 1 ms", function() {
      var earlier;
      earlier = now();
      return Bluebird.resolve().delay(1).then(function() {
        return assert.isBelow(now() - earlier, 3);
      });
    });
    it("shows that at least 190ms ms has passed after a timeout of 200ms", function() {
      var earlier;
      earlier = now();
      return Bluebird.resolve().delay(200).then(function() {
        return assert.isAbove(now() - earlier, 190);
      });
    });
    return it("shows that at most 220 ms has passed after a timeout of 200ms", function() {
      var earlier;
      earlier = now();
      return Bluebird.resolve().delay(200).then(function() {
        return assert.isBelow(now() - earlier, 220);
      });
    });
  });

}).call(this);
