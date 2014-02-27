var express = require('express')
  , path = require('path')
  , http = require('http')
  , push = require('./routes/push')
  , ga = require('./routes/ga')
  , dust = require('dustjs-linkedin')
  , cons = require('consolidate');

dust.helper = require('dustjs-helpers');

// redis connect
var connect = require('connect');

var redisToGoUrl = 'redis://redistogo:97b6e8020e78ddbb6210b9ad23e795b9@slimehead.redistogo.com:9768/';
var rtg   = require("url").parse(redisToGoUrl);
var redisClient = require("redis").createClient(rtg.port, rtg.hostname);

redisClient.auth(rtg.auth.split(":")[1]);
var RedisStore = require('connect-redis')(connect);


//dummy client for pubsub testing
redisClientDummyPublisher = require("redis").createClient(rtg.port, rtg.hostname);
redisClientDummyPublisher.auth(rtg.auth.split(":")[1]);


/// Get the app created, based it on express
var app = express();
app.engine('dust', cons.dust);

//configure the app, will be started later
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.cookieParser());
  app.use(express.session({secret: 'Demo', key: 'WORKS', cookie:{maxAge: 3000099}}));
  app.use("/public", express.static(path.join(__dirname, 'public')));
  app.use(app.router);
  app.set('port', process.env.PORT || '3099');
});

//define 2 routes for now, one for triggering a send message
//another one for viewing the pushed notifications
app.get('/send', push.send);
app.get('/view', push.view);
app.get('/ga', ga.queryGoogleAnalyticsData);

/**
 * subscribe to redis channel when client in ready
 */
redisClient.on('ready', function() {
  console.log('Got ready from Redis, will listen for notifications channel');
  redisClient.subscribe('notification');
});

/**
 * wait for messages from redis channel, on message
 * send updates on the rooms named after channels.
 *
 * This sends updates to users.
 */
redisClient.on("message", function(channel, message){
  console.log('Received message at Redis = '+channel+', message = '+message);
  var resp = {'message': message}
  io.sockets.in(channel).emit('message', resp);
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/**
 * socket io client, which listens for new websocket connection
 * and then handles various requests
 */
io.sockets.on('connection', function (socket) {
  //on subscription request joins specified room
  //later messages are broadcasted on the rooms
  socket.on('subscribe', function (data) {
    console.log('New websocket subscribed = '+data.channel);
    socket.join(data.channel);
  });
});