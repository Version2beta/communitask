var config = {};
config.port = process.env.WEB_PORT || 8000;
config.couch = {
  auth: {
    username: 'communitask',
    password: 'drunken himself holland'
  },
  host : '127.0.0.1',
  port : 5984,
}

module.exports = config;
