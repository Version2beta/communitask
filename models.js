//var redcouch = require('redcouch');
//var red = redcouch('http://localhost:5984');
var Backbone = require('backbone');

var models = module.exports = {};

models.Community = Backbone.Model.extend({
  initialize: function (opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.avatar = opts.avatar;
    this.link = opts.link;
    this.owners = opts.owners;
    this.status = opts.status || 'created';
  }
});

models.Communities = Backbone.Collection.extend({
  model: models.Community
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
  }
});

models.Members = Backbone.Collection.extend({
  model: models.Member;
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
  }
});

models.Tasks = Backbone.Collection.extend({
  model: models.Task;
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
  }
});

models.RecurringTasks = Backbone.Collection.extend({
  model: models.RecurringTask;
});
