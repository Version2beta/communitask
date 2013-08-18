var _ = require('underscore')._;
var config = require('./config');

var LazyBoy = require('LazyBoy');
LazyBoy.create_connection({
  url: config.couch.host,
  port: config.couch.port,
  db: config.couch.name,
  auth: config.couch.auth
})

var models = module.exports = {};

models.Community = LazyBoy.define('Community', {
    id: String,
    name: String,
    avatar: String,
    link: String,
    owners: String,
    status: String
});

models.Community = Backbone.Model.extend({
  initialize: function (opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.avatar = opts.avatar;
    this.link = opts.link;
    this.owners = opts.owners;
    this.status = opts.status || 'created';
  },
  url: function() { return '/communities/' + this.id; },
  collection: models.Communities
});

models.Communities = Backbone.Collection.extend({
  model: models.Community,
  url: '/communities'
});

models.Member = Backbone.Model.extend({
  initialize: function (opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.email = opts.email;
    this.hash = opts.hash;
    this.phone = opts.phone;
    this.communities = opts.communities;
    this.avatar = opts.avatar;
    this.status = opts.status || 'invited';
  },
  url: function() { return '/members/' + this.id; },
  collection: models.Members
});

models.Members = Backbone.Collection.extend({
  model: models.Member
});

models.Task = Backbone.Model.extend({
  initialize: function (opts) {
    this.id = opts.id;
    this.title = opts.title;
    this.description = opts.description;
    this.community = opts.community;
    this.categories = opts.categories;
    this.creator = opts.creator;
    this.createdOn = new Date();
    this.status = opts.status || 'created';
    this.owner = opts.owner;
    this.due = opts.due;
    this.priority = opts.priority || 0;
    this.done = null;
    this.doneBy = null;
    this.value = opts.value || 0;
  },
  url: function() { return '/tasks/' + this.id; },
  collection: models.Tasks
});

models.Tasks = Backbone.Collection.extend({
  model: models.Task
});

models.RecurringTask = Backbone.Model.extend({
  initialize: function (opts) {
    this.id = opts.id;
    this.title = opts.title;
    this.description = opts.description;
    this.link = opts.link;
    this.community = opts.community;
    this.categories = opts.categories;
    this.createdOn = new Date();
    this.status = opts.status || 'active';
    this.owner = opts.owner;
    this.assignees = opts.assignees;
    this.defaultPriority = opts.defaultPriority || 0;
    this.schedule = opts.schedule;
    this.window = opts.window;
    this.defaultValue = opts.defaultValue;
  },
  url: function() { return '/recurringtasks/' + this.id; },
  collection: models.RecurringTasks
});

models.RecurringTasks = Backbone.Collection.extend({
  model: models.RecurringTask
});
