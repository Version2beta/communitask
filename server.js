var config = require('./config');
var restify = require('restify');
var views = require('./views')

var server = restify.createServer();
server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

// Routes
server.get('/members', views.listMembers);
server.get('/members/:id', views.showMember);
server.post('/communities', views.communityCreate);

server.listen(config.port, function() {
	console.log('%s listening at %s', server.name, server.url);
});
