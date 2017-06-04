//  Setup
var restify = require('restify');
var restifyValidator = require('restify-validator');
var mongoose = require('mongoose');
var baseController = require('./controllers/baseController.js');
var usersController = require('./controllers/usersController.js');

mongoose.connect('mongodb://localhost/test');

// Create server using restify
var server = restify.createServer();

// Execution, configuring the server then building the endpoints
baseController(server, restify, restifyValidator)
usersController(server);

// Turn on the server
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
