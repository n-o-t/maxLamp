var express = require('express');
var session = require('express-session');
var socket_io    = require( "socket.io" );
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wait = require('wait-one-moment');
var pixel = require("./lib/pixel");
var colors = require('colors');
var every = require('every-moment');
var wait = require('wait-one-moment');
var Twitter = require('twitter');
var favicon = require('serve-favicon');

require('./config/config.js');

// Express
var app = express();

// Socket.io
var io  = socket_io();
app.io  = io;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({secret: 'ssshhhhh'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
//app.use('/', require('./routes/index')(app.io));
app.use('/users', users);




/**
 * io 
 */



/**
 * BOARD
 */

var five = require("johnny-five");
var pixel = require("./lib/pixel");
var board = new five.Board();
var strip = null;
board.status = false; 
var stripLength = 40; // seems to be no method to get strip length.
var stripPattern = {};

board.on("ready", function() {
  
  console.log("board ok");
  
  io.emit('board command', { data: 'ready' });

  

  strip = new pixel.Strip({
    data: 6,
    length: 40,
    board: this
  });
  this.repl.inject({ strip: strip});    

  strip.color("rgb(0, 15, 10)");
  strip.show();

  

  var timer = every(2, 'second', function() {
    io.emit('board command', { data: 'ready' });
  });

  function rgb2hex(rgb){
   rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }


  // get board pattern
  function getBoardPattern(msg) {
    //console.log("on est dans getBoardPattern");
    var temp = [];
    for (var i = 0; i < stripLength; i++) {
      rgb = strip.pixel(i).color().rgb;
      //console.log(rgb);
      temp.push('rgb('+rgb+')');
    };
    stripPattern = temp; 
    //console.log(stripPattern);
    io.emit('get-board-pattern', { msg:  stripPattern});
    return stripPattern;
  };

  //

  function showStrip(pattern) {
    for (var i = 0; i < pattern.length; i++) {
      var hex = rgb2hex(pattern[i]);
      strip.pixel(i).color(hex);
    };
    strip.show();
  };

  function boardNotificationTest (stripPattern, notificationPattern) {
    wait(0.1, 'seconds', function() {
      showStrip(notificationPattern);
      
    });
    
    wait(5.0, 'seconds', function() {
      showStrip(stripPattern);
     
    });
  }

  function boardNotification (stripPattern, notificationPattern) {
    console.log("board notif ");
    //console.log(typeof(notificationPattern));
    console.log(stripPattern);
    var notificationPattern = notificationPattern;
    var stripPattern = stripPattern;
    
    wait(0.1, 'seconds', function() {
      showStrip(notificationPattern);
      console.log('notif start');
    });
    
    wait(0.2, 'seconds', function() {
      showStrip(stripPattern);
      console.log('notif start 01');
    });

    wait(0.3, 'seconds', function() {
      showStrip(notificationPattern);
      console.log('notif start 02');
    });
    
    wait(0.4, 'seconds', function() {
      showStrip(stripPattern);
    });

    wait(0.5, 'seconds', function() {
      showStrip(notificationPattern);
    });
    
    wait(0.6, 'seconds', function() {
      showStrip(stripPattern);
    });

    wait(0.7, 'seconds', function() {
      showStrip(notificationPattern);
    });
    
    wait(0.8, 'seconds', function() {
      showStrip(stripPattern);
    });

    wait(0.9, 'seconds', function() {
      showStrip(notificationPattern);
    });
    
    wait(1, 'seconds', function() {
      showStrip(stripPattern);
    });

    wait(1.1, 'seconds', function() {
      showStrip(notificationPattern);
    });
    
    wait(1.2, 'seconds', function() {
      showStrip(stripPattern);
    });

    wait(1.3, 'seconds', function() {
      showStrip(notificationPattern);
    });
    
    wait(1.4, 'seconds', function() {
      showStrip(stripPattern);
    });
    
    wait(1.5, 'seconds', function(stripPattern) {
      showStrip(notificationPattern);
    });
    
    wait(1.6, 'seconds', function() {
      showStrip(stripPattern);
    });
    
    wait(1.7, 'seconds', function(stripPattern) {
      showStrip(notificationPattern);
    });
    
    wait(1.8, 'seconds', function() {
      showStrip(stripPattern);
    });
    
    wait(1.9, 'seconds', function(stripPattern) {
      showStrip(notificationPattern);
    });
    
    wait(2, 'seconds', function() {
      showStrip(stripPattern);
    });
    
    wait(2.1, 'seconds', function(stripPattern) {
      showStrip(notificationPattern);
    });
    
    wait(2.2, 'seconds', function() {
      showStrip(stripPattern);
      console.log("notifs done");
    });
    
    /*
    wait(5, 'seconds', function(stripPattern) {
      showStrip(notificationPattern);
    });
    
    wait(5.5, 'seconds', function() {
      showStrip(stripPattern);
    });
    */
  }

  function boardNotificationTwitter (stripPattern, notificationPattern01, notificationPattern02, notificationPattern03, notificationPattern04, notificationPattern05) {
    
    
    wait(0.1, 'seconds', function() {
      showStrip(notificationPattern01);
    });
    wait(0.2, 'seconds', function() {
      showStrip(notificationPattern02);
    });
    wait(0.3, 'seconds', function() {
      showStrip(notificationPattern03);
    });
    wait(0.4, 'seconds', function() {
      showStrip(notificationPattern04);
    });
     wait(0.5, 'seconds', function() {
      showStrip(notificationPattern05);
    });
    wait(1.5, 'seconds', function() {
      showStrip(notificationPattern04);
    });
    wait(1.6, 'seconds', function() {
      showStrip(notificationPattern03);
    });
    wait(1.7, 'seconds', function() {
      showStrip(notificationPattern02);
    });
    wait(1.8, 'seconds', function() {
      showStrip(notificationPattern01);
    });
    wait(1.9, 'seconds', function() {
      showStrip(notificationPattern02);
    });
    wait(2.0, 'seconds', function() {
      showStrip(notificationPattern03);
    });
    wait(2.1, 'seconds', function() {
      showStrip(notificationPattern04);
    });
    wait(2.2, 'seconds', function() {
      showStrip(notificationPattern05);
    });
    wait(3.3, 'seconds', function() {
      showStrip(notificationPattern04);
    });
    wait(3.4, 'seconds', function() {
      showStrip(notificationPattern03);
    });
    wait(3.5, 'seconds', function() {
      showStrip(notificationPattern02);
    });
    wait(3.6, 'seconds', function() {
      showStrip(notificationPattern01);
    });

    wait(3.7, 'seconds', function() {
      showStrip(stripPattern);
    });
  }  
  
  // socket.io events
  io.sockets.on( "connection", function( socket ){
    //console.log( "A user connected" );
    socket.on('board command', function (data) {
      console.log(data);
      switch(data.command) {
        case 'to-white':
        console.log("on est dans to-white");
        strip.color("rgb(199, 199, 199)");
        strip.show();
        break;
        case 'to-begin' :
        console.log('on est dans to begin');
        strip.color("rgb(0,15,10)");
        strip.show();
        break;
        //console.log(strip);
      }
    });

    socket.on('board message', function (msg) {
      console.log(msg);
    });

    socket.on('board-color-value', function (data) {
      //console.log(data.colorValue + "from app.js");
      var colorValue = data.colorValue;
      strip.color(colorValue);
      strip.show();
      //return pattern;
    });

    socket.on('board-color-pattern', function (data) {
      pattern = data.colorPattern;
      //console.log(pattern + " from board-color-pattern in app.js");
      app.locals.pattern = pattern;
      showStrip(pattern);
    });

    socket.on('pixel-color-value', function (data) {
      //console.log(data.colorValue + " from pixel color value in app.js");
      //console.log(data.pixelNumber + " from pixel color value in app.js");
      var colorValue = data.colorValue;
      var pixelNumber = data.pixelNumber;
      var p = strip.pixel(pixelNumber);
      p.color(colorValue);
      strip.show();
    });

    // get board pattern
    socket.on('get-board-pattern', function(msg){
      //console.log(msg);
      getBoardPattern();
    });

    socket.on('board-notification', function (data) {
      notificationPattern = data.pattern;
      //console.log("notificationPattern = " + notificationPattern + " from socket on board-notification");
      getBoardPattern();
      //console.log(stripPattern);
      //console.log("stripPattern = " + stripPattern + " from socket on board-notification");
      boardNotification (stripPattern, notificationPattern);
    });

    socket.on('board-notification-test', function (data) {
      notificationPattern = data.pattern;
      //console.log("notificationPattern = " + notificationPattern + " from socket on board-notification");
      getBoardPattern();
      //console.log(stripPattern);
      //console.log("stripPattern = " + stripPattern + " from socket on board-notification");
      boardNotificationTest (stripPattern, notificationPattern);
    });

    socket.on('board-notification-twitter', function (data) {
      notificationPattern1 = data.pattern1;
      notificationPattern2 = data.pattern2;
      notificationPattern3 = data.pattern3;
      notificationPattern4 = data.pattern4;
      notificationPattern5 = data.pattern5;
      //console.log("notificationPattern = " + notificationPattern + " from socket on board-notification");
      getBoardPattern();
      //console.log(stripPattern);
      //console.log("stripPattern = " + stripPattern + " from socket on board-notification");
      boardNotificationTwitter (stripPattern, notificationPattern1, notificationPattern2, notificationPattern3, notificationPattern4, notificationPattern5);
    });

  }); // end socket

});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

