var restify = require('restify');
var _ = require('underscore')._;

var models = require('./models');
var views = require('./views');
var log = require('./lib/log');

var config = require('./config');
var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

// Routes
server.get('/members', views.listMembers);
server.get('/members/:id', views.showMember);
server.post('/communities', views.createCommunity);
server.get(/.*/, restify.serveStatic({
  directory: './build',
  default: 'index.html'
}));

models.connect(config, function (err) {
  if (err) log.info(err);
  server.listen(config.port, function() {
    log.info('%s listening at %s', server.name, server.url);
  });
  //var community = new models.Community({id: 'duckduckduck'});
  //community.save();
  var communities = new models.Communities();
  communities.fetch({
    error: function () { 
      log.info("The database seems to have been misplaced.");
      process.exit(1);
    }
  });
});

