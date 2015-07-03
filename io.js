/*
var io = require('socket.io')();

// When someone has connected to me...
io.sockets.on('connection', function (socket) {
  // When I've received 'board command' message from this connection...
  socket.on('board command', function (data) {
    console.log(data);
  });
  socket.on('board command', function () {
    //console.log(data);
  });
  socket.emit('board command', { data: 'socket connecté depuis io.js' });
});

module.exports = io;

*/