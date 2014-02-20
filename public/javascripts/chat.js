var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(text, username) {
  var message = {
    text: text,
    username: username
  };
  
  this.socket.emit('message', message);
};