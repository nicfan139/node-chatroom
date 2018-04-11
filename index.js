var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Route Handler
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

// Socket.io initializer
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    var currDate = new Date();
    var datetime = currDate.getDate() + "/"
                + (currDate.getMonth()+1)  + "/"
                + currDate.getFullYear() + "@"
                + currDate.getHours() + ":"
                + currDate.getMinutes() + ":"
                + currDate.getSeconds();
    console.log('Message sent on ' + datetime + ': ' + msg);
  });
});

// Server
http.listen(8000, function(){
  console.log('listening on *:8000');
});
