'use strict';
// Require and load http module, then assign it to a constant called http
const http = require('http')

http
	.createServer((request, response) => {
		response.writeHead(200, {'Content-type': 'text/html'});
		response.end('<h1>My first NodeJS script</h1>');
	})
    .listen(3000, () => console.log('Server running on port 3000'));