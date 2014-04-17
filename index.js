#!/usr/bin/env node

// index.js - Main export.
module.exports = (function(undefined) {

  var assert = require('assert')
    , JSONStream = require('JSONStream')
    , optimist = require('optimist')
    , moment = require('moment')
    , stream = require('stream')
    , util = require('util');

    /**
     *
     * @param {Date} from
     * @param {Date} to
     * @constructor
     */
  function TimeFilterStream(from, to) {
    stream.Transform.call(this, { objectMode: true });
    this.from = from;
    this.to = to;
  }

  util.inherits(TimeFilterStream, stream.Transform);

  TimeFilterStream.prototype._transform = function(chunk, encoding, callback) {
    var time = moment(chunk.time);
    if (time.isAfter(this.from) && time.isBefore(this.to)) {
      this.push(chunk);
    }

    return callback(null);
  };

  return function filter(from, to) {
    process.stdin
      .pipe(JSONStream.parse())
      .pipe(new TimeFilterStream(new Date(from), new Date(to)))
      .pipe(JSONStream.stringify(false))
      .pipe(process.stdout);
  };
})();

if (require.main === module) {
  var argv = Array.prototype.slice.call(process.argv);
  argv.shift(); // node
  argv.shift(); // index.js

  if (argv.length === 0) {
    console.error("bunyan-between from-date [to-date]");
    return process.exit(1);
  }

  module.exports.apply(this, argv);
}

