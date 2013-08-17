var redcouch = require('redcouch');
var red = redcouch('http://localhost:5984');
var Backbone = require('backbone')

var Models = {

  Community: Backbone.Model.extend({
    initialize: function(name) {
      console.log('new Community ' + name);
    }
  })

}

module.exports = Models;
