var restify = require('restify');
var server = restify.createServer();

// Mocked Database
var users = {};
var max_user_id = 0;

// Instantiating options for the restify server
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

server.get("/", function(req, res, next){
  res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify(users));
  return next();
});

server.get("/users/:id", function(req, res, next){
  res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify(users[parseInt(req.params.id)]));
  return next();
});

server.put("/users/:id", function(req, res, next){
  var user = users[parseInt(req.params.id)];
  var updates = req.params;
  for( var field in updates ) {
    user[field] = updates[field];
  }

  res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify(users[parseInt(req.params.id)]));
  return next();
});

server.del("/users/:id", function(req, res, next){
  delete users[parseInt(req.params.id)];

  res.writeHead(204, {'Content-type': 'application/json'});
  res.end(JSON.stringify(true));
  return next();
});

server.post("/users", function(req, res, next){
  // creating a var user that stores the params of the request
  var user = req.params;
  // increment the max_user_id set to determine the id of user created
  max_user_id++;
  // Assigning an id attirbute to the user var declared above
  user.id = max_user_id;
  // Assigning an JSON hash object containing the user with key of user_id
  users[user.id] = user;

  res.writeHead(201, {'Content-type': 'application/json'});
  res.end(JSON.stringify(user));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
