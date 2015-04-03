/**
 * PubSub webserver subscription library, a reference to an axon socket.
 */
'use strict';

var axon   = require('axon');
var socket = axon.socket('sub'); // subscription socket

// connect to the broadcasting service
// @see pubsub/lib/broadcast
socket.connect(8001);

// node convention to listen to error on an event emitter (axon)
socket.on('error', function(err) {
	throw err;
});

module.exports = socket;