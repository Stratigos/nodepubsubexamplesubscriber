/**
 * nodejs example webserver subscriber/listener app
 */
'use strict';

// allthough the following expressions can be combined into one expression
//  as follows:
// ````
//     var app = require('express')(); // immediately evoke express();
// ````
// the express var simplifies accessing the static() method.
var express   = require('express');
var app       = express();
var server    = require('http').createServer(app);
var io        = require('socket.io').listen(server);
var subSocket = require('./lib/subscribe'); // subscription socket (pub server)
var badges    = require('./models/badge');

server.listen(3000, function() {
    console.log('Server is running on port %d.', 3000);
});

// Tells express to serve static assets from the '/public' directory. 
//  This app is not taking any requests (so no need to filter incoming
//  data, etc).
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

// on connect, fetch the badges, and emit an event to do something with them
io.sockets.on('connection', function(socket) {
    badges.get(function(err, data) {
        if (err) {
            return;
        }
        data.forEach(function(badge) {
            socket.emit('badge', badge);
        });
    });
});

// every time a new badge is broadcasted, emit the event to do something with
//  the current badges
subSocket.on('message', function(message) {
    io.sockets.emit('badge', message);
});