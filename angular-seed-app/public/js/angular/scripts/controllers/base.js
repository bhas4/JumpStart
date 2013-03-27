'use strict';

//Base controller, that can be used for keeping common logic etc.,
var BaseCtrl = function($routeParams, $scope, $resource, user) {
  //initilize an empty array of donorUsers will be loaded on init
  $scope.donorUsers = [];  

  $scope.initDonorsList = function(data){
    $scope.donorUsers = data;
  }

  $scope.appendDonor = function(data){
    $scope.donorUsers.push(data);
  }
}

//associate the controller with the app as controller
donorApp.controller('BaseCtrl', BaseCtrl);