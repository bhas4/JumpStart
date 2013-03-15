var util = require('util');

/*
 * Controller for demo of Socket.IO based push notification
 */

exports.view = function(req, res){
  res.render('notification', {});
};

exports.send = function(req, res){
  /**
   * Simulates publish to redis channels
   */
  global.redisClientDummyPublisher.publish('notification', "We are sending this message at -- "+(new Date()));
  res.end();
};
