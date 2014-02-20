/** Variables and dependencies **/
var socketio = require('socket.io');
var io;

/** Socket.IO server handler **/
exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log_level', 1);
  
  io.sockets.on('connection', function(socket) {
    var randomGuestNumber = Math.floor((Math.random()*100)+1);
    
    indicateThatGuestHasJoinedTheRoom(socket, randomGuestNumber);
    handleMessageBroadcast(socket);
  });
};

function indicateThatGuestHasJoinedTheRoom(socket, randomGuestNumber) {
  console.log("User has joined the room and has received guest number " + randomGuestNumber);
  var name = "Guest" + randomGuestNumber;
  
  socket.join("chat");
  
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  
  socket.broadcast.to("chat").emit('message', {
    text: name + " has joined the chat room!",
    username: "system"
  });
}


function handleMessageBroadcast(socket) {
  socket.on('message', function (message) {
    socket.broadcast.to("chat").emit('message', {
      text: message.text,
      username: message.username
    });
  });
}