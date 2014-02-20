var socket = io.connect();
var username;

$(document).ready(function() {
  var chatApp = new Chat(socket);
  
  socket.on('nameResult', function(result) {
    var message;
    
    if (result.success) {
      message = 'You are now known as ' + result.name + '!';
    } else {
      message = result.message;
    }
    
    username = result.name;
    alert(message);
  });
  
  socket.on('message', function(message) {
    var newMessage = $('<div></div>').text(message.username + ": " + message.text);
    $('#chat-wrapper').append(newMessage);
  });
  
  $('#chat-form').submit(function() {
    processUserMessage(chatApp, socket);
    return false;
  });
});

function processUserMessage(chatApp, socket) {
  var message = $('#chat-message').val();
  
  console.log("Sending message: " + message);
  chatApp.sendMessage(message, username);
  
  var newMessage = $('<div></div>').text(username + ": " + message);
  $('#chat-wrapper').append(newMessage);
  
  $('#chat-message').val('');
}