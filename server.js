var util = require('util');
var log = require('./lib/log');
var _ = require('underscore')._;
var restify = require('restify');

var views = require('./views');
var config = require('./config');

var server = restify.createServer();
server
  .use(restify.fullResponse())
  .use(restify.bodyParser());
server.pre(restify.pre.userAgentConnection());

/* Routes */

// Communities
server.get('/communities', views.listCommunities);
/*
server.post('/communities', views.createCommunity);
server.get('/communities/:cid', views.showCommunity);
server.put('/communities/:cid', views.updateCommunity);
server.del('/communities/:cid', views.deleteCommunity);
server.get('/communities/:cid/members', views.showCommunityMembers);
server.post('/communities/:cid/members', views.addCommunityMember);
server.del('/communities/:cid/members/:mid', views.deleteCommunityMember);
server.get('/communities/:cid/owners', views.showCommunityOwners);
server.post('/communities/:cid/owner', views.addCommunityOwner);
server.get('/communities/:cid/owners/:mid', views.deleteCommunityOwner);

// Members
server.get('/members', views.listMembers);
server.post('/members', views.createMember);
server.get('/members/:mid', views.showMember);
server.put('/members/:mid', views.updateMember);
server.del('/members/:mid', views.deleteMember);

// Tasks
server.get('/tasks', views.listTasks);
server.post('/tasks', views.createTask);
server.get('/tasks/:tid', views.showTask);
server.put('/tasks/:tid', views.updateTask);
server.del('/tasks/:tid', views.deleteTask);

// RecurringTasks
server.get('/recurring', views.listRecurring);
server.post('/recurring', views.createRecurring);
server.get('/recurring/:rid', views.showRecurring);
server.put('/recurring/:rid', views.updateRecurring);
server.del('/recurring/:rid', views.deleteRecurring);
*/

// Static content
server.get(/.*/, restify.serveStatic({
  directory: './build',
  default: 'index.html'
}));

// Listen
views.connect(function (err) {
  if (err) {
    log.info('Views connect failed');
    process.exit(1);
  } else {
    server.listen(config.port, function() {
      log.info('%s listening at %s', server.name, server.url);
    });
  }
});
