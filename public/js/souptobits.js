// https://github.com/codeschool/nodejs-soup-to-bits-web-server/blob/master/public/js/souptobits.js
'use strict'; // safe in any browser, even when not supported

$(function(){
  var socket = io.connect();

  socket.on('badge', function(badge){
    var img = $('<img src="'+badge.badge_id+'" alt="CodeSchool Badge">');
    $('.badge-wrapper').prepend(img);
    setTimeout(function(){
      img.addClass('on');
    }, 0);
  });
});
