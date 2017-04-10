/**
 * Module dependencies
 */
var app = require('./app'),
    socketio = require('socket.io');

/**
 * Module variables
 */
var port = process.env.port || 3000;

var server = app.listen(port, function() {
    console.log('Server running on ', port);
});

var io = socketio(server);
io.on('connection', function(socket) {
    console.log('Socket connected');
    socket.on('disconnect', function() {
        console.log('Socket disconnected');
    });
});