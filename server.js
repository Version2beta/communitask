var restify = require('restify');

var views = require('./views')
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

server.listen(config.port, function() {
  log.info('%s listening at %s', server.name, server.url);
});
