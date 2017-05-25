var restify = require('restify');
var server = restify.createServer();

// Mocked Database
var users = {};
var max_user_id = 0;

// Helper Functions
function respond(res, next, status, data, http_code) {
  var response = {
    'status': status,
    'data': data
  }

  res.writeHead(http_code, {'Content-type': 'application/json'});
  res.end(JSON.stringify(response));
  return next();
}

function success(res, next, data) {
  respond(res, next, 'success', data, 200);
}

function failure(res, next, data, http_code) {
  respond(res, next, 'failure', data, http_code);
}

function validate_presence_of_user(user_id, res, next){
  if (typeof(users[user_id]) === 'undefined') {
    failure(res, next, 'User not found', 404);
  }
}
// Instantiating options for the restify server
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

server.get("/", function(req, res, next){
  success(res, next, users);
});

server.get("/users/:id", function(req, res, next){
  var user_id = parseInt(req.params.id);
  validate_presence_of_user(user_id, res, next);

  success(res, next, users[user_id]);
});

server.put("/users/:id", function(req, res, next){
  var user_id = parseInt(req.params.id);
  validate_presence_of_user(user_id, res, next);

  var user = users[user_id];
  var updates = req.params;
  for( var field in updates ) {
    user[field] = updates[field];
  }

  success(res, next, users[user_id]);
});

server.del("/users/:id", function(req, res, next){
  var user_id = parseInt(req.params.id);
  validate_presence_of_user(user_id, res, next);

  delete users[user_id];

  success(res, next, []);
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

  success(res, next, user);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
