/**
 * PubSub webserver application Badge model.
 */
'use strict';

// library to perform requests
var request = require('request');

/**
 * Get badges from the PubSub broadcast server
 * @param {Function} callback
 */
 exports.get = function(callback) {
    request('http://localhost:8000/badges', function(err, response, body) {
        if (err) {
            return callback(err, []);
        }
        body = JSON.parse(body);
        callback(err, body.data);
    });
 };