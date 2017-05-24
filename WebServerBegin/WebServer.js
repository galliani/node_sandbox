'use strict'
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
}

function webserver(req, res){
  // The router
  // This is the function that process the incoming request and serving the appropriate responses

  let baseURI = url.parse(req.url);
  let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
  console.log(filepath);

  // Now that the absolute filepath is stored in the variable, we try to find out
  // if the file exists or not
  // the .access method accepts filepath var as an argument, along with
  // fs.F_OK which checks if the file is accessible or not, then we declare
  // error callback to handle any error that comes up
  fs.access(filepath, fs.F_OK, error => {
    if(!error) {
      // Check if callback error does not exist, then serve the file
      fs.readFile(filepath, (error, content) => {
        if(!error) {
          // resolve content type of the file
          let contentType = mimes[path.extname(filepath)];
          // then serve it
          res.writeHead(200, {'Content-type': contentType});
          res.end(content, 'utf-8');
        } else {
          // throw 500 error response
          res.writeHead(500);
          res.end('Internal server error');
        }
      })
    } else {
      // typical 404 response if error exists
      res.writeHead(404);
      res.end('Content not found');
    }
  })

}

http.createServer(webserver).listen(3000, () => {
  console.log('Server running on port 3000');
})
