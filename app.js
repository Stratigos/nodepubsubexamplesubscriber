'use strict';

// allthough the following expressions can be combined into one expression
//  as follows:
// ````
// var app = require('express')(); // immediately evoke express();
// ````
// the express var simplifies accessing the static() method.
var express = require('express');
    app     = express();
var server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

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