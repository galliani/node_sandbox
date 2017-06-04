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

// Promises
function fileAccess(filepath){
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.F_OK, error => {
      if(!error) {
        resolve(filepath);
      } else {
        reject(error);
      }
    });
  });
}

// This is a promise method to read and stream file instead of reading it until
// the buffer completes then flushing the content out of memory
function streamFile(filepath) {
  return new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(filepath);

    // The fileStream variable is an event object,
    // so we can use .on to listen
    fileStream.on('open', () => {
      resolve(fileStream);
    });

    fileStream.on('error', error => {
      reject(error);
    });
  });
}

function webserver(req, res){
  // The router
  // This is the function that process the incoming request and serving the appropriate responses

  let baseURI = url.parse(req.url);
  let filepath = __dirname + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
  // resolve content type of the file
  let contentType = mimes[path.extname(filepath)];

  // Now that the absolute filepath is stored in the variable, we try to find out
  // if the file exists or not
  // the .access method accepts filepath var as an argument, along with
  // fs.F_OK which checks if the file is accessible or not, then we declare
  // error callback to handle any error that comes up

  fileAccess(filepath)
    .then(streamFile)
    .then(fileStream => {
      res.writeHead(200, {'Content-type': contentType});
      fileStream.pipe(res);
    })
    .catch(error => {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    });
}

http.createServer(webserver).listen(3000, () => {
  console.log('Server running on port 3000');
})
