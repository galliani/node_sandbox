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
    req.assert('id', 'Must be present and is a numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if (errors) {
      response_handler.failure(res, next, errors[0], 400);
    }

    var user_id = parseInt(req.params.id);
    validations.presence_of_user(users[user_id], res, next);

    response_handler.success(res, next, users[user_id]);
  });

  server.put("/users/:id", function(req, res, next){
    req.assert('id', 'Must be present and is a numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if (errors) {
      response_handler.failure(res, next, errors[0], 400);
    }

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
    req.assert('id', 'Must be present and is a numeric').notEmpty().isInt();
    var errors = req.validationErrors();
    if (errors) {
      response_handler.failure(res, next, errors[0], 400);
    }

    var user_id = parseInt(req.params.id);
    validations.presence_of_user(users[user_id], res, next);

    delete users[user_id];

    response_handler.success(res, next, []);
  });

  server.post("/users", function(req, res, next){
    // Params assertion
    req.assert('name', 'Must be present').notEmpty();
    req.assert('email', 'Must be present and with valid format').notEmpty().isEmail();

    var errors = req.validationErrors();
    
    if (errors) {
      response_handler.failure(res, next, errors, 400);
    } else {
      // creating a var user that stores the params of the request
      var user = req.params;
      // increment the max_user_id set to determine the id of user created
      max_user_id++;
      // Assigning an id attirbute to the user var declared above
      user.id = max_user_id;
      // Assigning an JSON hash object containing the user with key of user_id
      users[user.id] = user;

      response_handler.success(res, next, user);
    }
  });

}
