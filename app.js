// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/web'));


// User verbunden

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


// Textnachricht schicken

// send to all incl. sender
io.on('connection', function (socket) {

    socket.on('chat message', function (msg) {
        console.log(' - message: ' + msg);
        io.emit('chat message', msg);
    });

});

// Steuerbefehl
io.on('connection', function (socket) {

    socket.on('steuerbefehl', function (msg) {
        console.log(' - steuerbefehl: ' + msg);

        io.emit('steuerbefehl', msg);
    });
});


// ping_2
io.on('connection', function (socket) {

    socket.on('ping_2', function (msg) {
        console.log(' - ping_2: ' + msg);

        io.emit('ping_2', msg);
    });
});

// Steuerbefehl schicken


