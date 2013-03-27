'use strict';

//Model for User object, consumed on listing / create flows
donorApp.factory('user', ['$resource', function ($resource, $scope) {

  //REST-API for the user is invoked from here
  var User = $resource('/users/:action',
    {
      action:'@action'
    },
    {
      //setting isArray: true is important
      'getAll': { method:'GET', isArray:true, params: {action: 'list'}},

      //define the user create as POST method
      'create': { method:'POST', params: {action: 'create'}}
    });

  //Sample service methods that can be used for putting in model specific logic
  User.prototype.isAccepted = function() {    
    //TODO: you can use... this.is_accepted
    return true;
  }

  return User;
 }]);