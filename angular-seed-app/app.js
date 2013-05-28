var express = require('express')
  , path = require('path')
  , http = require('http')
  , donor = require('./routes/donor')
  , dust = require('dustjs-linkedin')
  , cons = require('consolidate');

dust.helper = require('dustjs-helpers');
 
/// Get the app created, based it on express
var app = express();
app.engine('dust', cons.dust);

//configure the app, will be started later
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');  
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({secret: 'Demo', key: 'WORKS', cookie:{maxAge: 3000099}}));  
  app.use("/public", express.static(path.join(__dirname, 'public')));
  app.use(app.router);
  app.set('port', process.env.PORT || '3199');
});

//define 2 routes for now, one for triggering a send message
//another one for viewing the pushed notifications
app.get('/dashboard', donor.dashboard);
app.get('/users/list', donor.getUsers);
app.post('/users/create', donor.createUser);
app.get('/livechat', donor.livechat);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});