'use strict';

//Basic CRUD support for Offers
/*
  @params -- ones starting with @ are provided by AngularJS, injecting 2 of them here 
  @param : user -- our service class injected by AngularJS
*/
var UserCtrl = function($routeParams, $scope, $resource, user) {

  $scope.loadData = function(){
    $scope.fetchUsers();
  }

  //invokes the service layer to make the AJAX call
  $scope.fetchUsers = function(){
    user.getAll({}, function(data){
      $scope.initDonorsList(data);
    });
  }

  //invokes the service layer to make the AJAX call
  $scope.addDonor = function(){
    //send the new user object to service layer
    user.create($scope.new_user, function(data){
      //on response, append the newly created user to list
       $scope.appendDonor(data);

      //since we used a popup to create user form, close it
      $scope.closeForm();
    });
  }

  //used in view to iterate over the offers
  $scope.getDonorUsers = function(){
    return $scope.donorUsers;
  }

  //onload of controller, invoke the method to fetch offers
  $scope.loadData();
};

//associate the controller with the app as controller
donorApp.controller('UserCtrl', UserCtrl);