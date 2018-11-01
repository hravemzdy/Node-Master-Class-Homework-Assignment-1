/*
Homework Assignment #1
Hello World 

Please create a simple "Hello World" API. Meaning:
1. It should be a RESTful JSON API that listens on a port of your choice. 
2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 
*/

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var config = {
    'httpPort' : 3000,
};

var httpServer = http.createServer(function(req, res) {
    createRestApiServer(req, res);
});

httpServer.listen(config.httpPort, function() {
    console.log('Http Server is listening on port ' + config.httpPort + ' now.');
});

var createRestApiServer = function(req, res) {
    var requestUrl = url.parse(req.url, true);
    
    var requestPath = requestUrl.pathname;

    const trimePattern = /^\/+|\/+$/g;
    var trimedPath = requestPath.replace(trimePattern, '');

    var fakeData = '';

    var responseHandler = findHandler(trimedPath);

    responseHandler(fakeData, function(statusCode, payload) {
        // Use the status code called back by the handler, or set the default status code to 200
        statusCode = secureStatusCode(statusCode);
        // Use the payload called back by handler, or set the default payload to an empty object
        payload = securePayload(payload);
        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);
        // Return response
        res.setHeader('Content-Type','application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        console.log('Returning this response: ', statusCode, payloadString, '\n');
    });
};
var secureStatusCode = function(statusCode) {
    if (typeof(statusCode) == 'number') {
        return  statusCode ;
    }
    return 200;
};

var securePayload = function(payload) {
    if (typeof(payload) == 'object') {
        return  payload ;
    }
    return {};
};

var helloPayload = {
    'greeting' : 'Hello from "Hello World" API',
    'task' : 'Homework Assignment #1'
}

var findHandler = function(path) {
    if (typeof(router[path]) != 'undefined') {
        return router[path];
    }
    return handlers.notFound;
};

// Define the handlers
var handlers = {};

// Hello handler
handlers.hello = function(data, callback){
    // Callback a http status code, and a payload object
    callback(200, helloPayload);
};

// Not found handler
handlers.notFound = function(data, callback){
  callback(404);
};

// Define a request router
var router = {
    'hello' : handlers.hello
};
  