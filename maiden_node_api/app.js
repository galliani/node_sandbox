//  Setup
var restify = require('restify');
var baseController = require('./controllers/baseController.js');
var usersController = require('./controllers/usersController.js');

// Create server using restify
var server = restify.createServer();

// Execution, configuring the server then building the endpoints
baseController(server, restify)
usersController(server);

// Turn on the server
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
