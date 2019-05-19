'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

const MongoDB = {
  'host': 'localhost',
  'port': 27017,
  'database': 'OfficeHoursMasterDB',
  'name': 'MongoDB',
  'allowExtendedOperators': true,
  'connector': 'mongodb',
};
app.dataSource(MongoDB.name, MongoDB);

// Add middleware 'routes:before'
app.middleware('routes:before', '/', function(req, res, next) {
  for (var model in app.models) {
    if (app.models.hasOwnProperty(model)) {
        // Customize the value provided to “options”, inject req object to options.
      app.models[model].createOptionsFromRemotingContext = function(ctx) {
        var base = this.base.createOptionsFromRemotingContext(ctx);
        base.req = ctx.req;
        return base;
      };
    }
  }
  next();
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
