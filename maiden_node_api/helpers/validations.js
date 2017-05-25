var response_handler = require('./responseHandler.js');

// exporting a method called presence_of_user for this module
module.exports.presence_of_user = function (user, res, next){
  if (typeof(user) === 'undefined') {
    response_handler.failure(res, next, 'User not found', 404);
  }
}
