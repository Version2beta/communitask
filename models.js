var _ = require('underscore')._;
var config = require('./config');

var cradle = require('cradle');
var con = new(cradle.Connection)(
    config.couch.host,
    config.couch.port,
    {
      auth: {
        username: config.couch.auth.username,
        password: config.couch.auth.password
      },
      retries: 3,
      retryTimeout: 30 * 1000
    });

var createIfNeeded = function (db) {
  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
      process.exit(1);
    } else if (!exists) {
      console.log('database does not exists.');
      console.log(db.info());
      db.create();
      /* populate design documents */
    }
  });
}

dbCommunities = con.database('communities');
createIfNeeded(dbCommunities);

var models = module.exports = {};
