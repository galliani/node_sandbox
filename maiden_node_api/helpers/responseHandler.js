function _respond(res, next, status, data, http_code) {
  var response = {
    'status': status,
    'data': data
  }

  res.writeHead(http_code, {'Content-type': 'application/json'});
  res.end(JSON.stringify(response));
  return next();
}
// The underscore in the front of the method name indicates that this method is
// private, only used in this file.

// Exported modules
// exporting methods called success and failure for this module
module.exports.success = function (res, next, data) {
  _respond(res, next, 'success', data, 200);
}

module.exports.failure = function (res, next, data, http_code) {
  _respond(res, next, 'failure', data, http_code);
}
