var util = require('util');

/*
 * Controller for demo of AngularJS Eye Donor seed app
 */

exports.dashboard = function(req, res){
  res.render('dashboard', {});
};

exports.createUser = function(req, res){
  res.contentType('application/json');

  //TODO: add the required code to persist into DB / make server call

  //for now returning hardcoded data back
  var newUser = req.body;
  newUser.id = 555;

  res.write(JSON.stringify(newUser));
  res.end();
};

exports.getUsers = function(req, res){
  res.contentType('application/json');
  var users = [
      {first_name: 'Doug', last_name: 'Gold', email: 'doug@gold.com'},
      {first_name: 'Andy', last_name: 'Turner', email: 'andy@turner.com', age: 37},
      {first_name: 'William', last_name: 'Smith', email: 'william@smith.com'},
      {first_name: 'Angelina', last_name: 'Willis', email: 'angelina@willis.com', age: 34}
    ];
  res.write(JSON.stringify(users));
  res.end();
};