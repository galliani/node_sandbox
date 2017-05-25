// Helper modules
var response_handler = require('../helpers/responseHandler.js');
var validations = require('../helpers/validations.js');

// Mocked Database
var users = {};
var max_user_id = 0;

module.exports = function(server){

  server.get("/", function(req, res, next){
    response_handler.success(res, next, users);
  });

  server.get("/users/:id", function(req, res, next){
    var user_id = parseInt(req.params.id);
    validations.presence_of_user(users[user_id], res, next);

    response_handler.success(res, next, users[user_id]);
  });

  server.put("/users/:id", function(req, res, next){
    var user_id = parseInt(req.params.id);
    validations.presence_of_user(users[user_id], res, next);

    var user = users[user_id];
    var updates = req.params;
    for( var field in updates ) {
      user[field] = updates[field];
    }

    response_handler.success(res, next, users[user_id]);
  });

  server.del("/users/:id", function(req, res, next){
    var user_id = parseInt(req.params.id);
    validations.presence_of_user(users[user_id], res, next);

    delete users[user_id];

    response_handler.success(res, next, []);
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

    response_handler.success(res, next, user);
  });


}
