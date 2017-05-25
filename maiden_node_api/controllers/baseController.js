// Instantiating options for the restify server
module.exports = function(server, restify, validator){

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  server.use(restify.queryParser());
  server.use(validator)
}
