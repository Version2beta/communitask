var config = {};
config.port = process.env.WEB_PORT || 8000;
config.couch = {
  auth: {
    username: 'communitask',
    password: 'drunken%20himself%20holland'
  },
  host : '127.0.0.1',
  port : 5984,
  name : 'communitask'
}

module.exports = config;
