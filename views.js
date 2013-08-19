var util = require('util');
var log = require('./lib/log');
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

var createIfNeeded = function (db, cb) {
  db.exists(function (err, exists) {
    if (err) {
      cb(err, false);
    } else if (!exists) {
      db.create(function (err) {
        if (err) {
          cb(err, false);
        } else {
          cb(null, true);
        }
      });
    } else {
      cb(null, false);
    }
  });
}

var dbCommunitask = con.database('communitask');


/* Views */

var views = module.exports = {

  connect: function(cb) {
    createIfNeeded(dbCommunitask, function(err, created) {
      if (err) {
        log.info('Communitask database failed: ' + util.inspect(err));
        cb(err);
      } else if (created) {
        log.info('Communitask database created.');
        dbCommunitask.save('_design/communities', {
          listCommunities: {
            map: function (doc) {
              if (doc._id) emit(doc._id, doc);
            }
          }
        });
      }
      cb(null);
    });
  },

  listCommunities: function(req, res, next) {
    dbCommunitask.view('communities/listCommunities', function(err, communities) {
      if (err) {
        util.inspect(err);
      } else {
        next(res.send(communities));
      }
    });
  }
};

