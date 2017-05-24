'use strict'
const http = require('http');
const url = require('url');
const qs = require('querystring'); 

let routes = {
		'GET': {
				'/': (request, response) => {
						response.writeHead(200, {'Content-type': 'text/html'});
						response.end('<h1>Hello router</h1>');
				},
				'/about': (request, response) => {
						response.writeHead(200, {'Content-type': 'text/html'});
						response.end('<h1>This is about page</h1>');
				},
				'/api/getinfo': (request, response) => {
						// This kind of routes can be use to fetch DB or data as the response
						response.writeHead(200, {'Content-type': 'application/json'});
						response.end(JSON.stringify(request.queryParams));
				}								
		},
		'POST': {
				'/api/login': (request, response) => {
						let body = '';

						// Add an event listener for event called 'data' which is send to the server, to the request object
						// Then assign a callback to it
						request.on('data', data => {
								body += data;
						});

						// Add an event listener for event 'end', when the entire sets of data has flown in
						request.on('end', () => {
								let params = qs.parse(body);
								console.log('Username: ', params['username']);
								console.log('Password: ', params['password']);
								response.end();
						});
				}
		},
		'NA': (request, response) => {
				response.writeHead(404);
				response.end('Content not found')
		}
}

function router(request, response) {
		let baseURI = url.parse(request.url, true);
		let resolveRoute = routes[request.method][baseURI.pathname];

		if(resolveRoute != undefined) {
				// Assign a custom attribute 'queryParams' to the request object with the query attribute from baseURI var 
				request.queryParams = baseURI.query;
				// Send the modified request and response variable as an argument to resolveRoute method
				resolveRoute(request, response);
		} else {
				routes['NA'](request, response);
		}
}

 http
 		.createServer(router)
 		.listen(3000, () => {
 			console.log('Server is running on port 3000')
 		})

