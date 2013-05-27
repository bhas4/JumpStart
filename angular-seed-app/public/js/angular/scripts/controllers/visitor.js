'use strict';

/*
  @params -- ones starting with @ are provided by AngularJS, injecting 2 of them here 
  @param : user -- our service class injected by AngularJS
*/
var VisitorCtrl = function($routeParams, $scope, $resource, user) {
  $scope.visitors = [];

  $scope.loadData = function(){
    $scope.fetchUsers();
  }

  //for the demo purpose, we will return a hard coded array of users
  $scope.fetchUsers = function(){
    //going to keep 
    $scope.visitors = [{id: 1, name: 'Deepak K', date: '3/3/2013', style: {bgcolor: '#f1f1f1', font_size:'16px'}}, 
                          {id: 2, name: 'Rohan S', date: '12/31/2012', style: {bgcolor: '#f1f1f1', font_size:'16px'}}, 
                              {id: 3, name: 'Vinay S', date: '5/4/2012', style: {bgcolor: '#f1f1f1', font_size:'16px'}}];
  }

  //function that will be invoked from the directive
  $scope.getBGColor = function(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }

  //function called on loop thru users, used for updating font for id=2
  $scope.checkFonts = function(item){
    if (item.id === 2){
      item.style.font_size = '24px';
    }
    return true;
  }

  $scope.loadData();
};

//associate the controller with the app as controller
donorApp.controller('VisitorCtrl', VisitorCtrl);