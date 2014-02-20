/** Includes **/
var http   = require('http');
var fs     = require('fs');
var path   = require('path');
var mime   = require('mime');

/** Helper methods **/

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('404 error, lols you broke it');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serveStatic(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response);
        } else {
          sendFile(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

/** Create HTTP server **/
var server = http.createServer(function(request, response) {
  var filePath = false;
  
  if (request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  
  var absPath = './' + filePath;
  serveStatic(response, absPath);
});

/** Start the HTTP server **/
server.listen(3000, '0.0.0.0');
console.log("Server listening for connections on port 3000");

/** Start the Socket.io server **/
var chatServer = require('./src/chat_server');
chatServer.listen(server);