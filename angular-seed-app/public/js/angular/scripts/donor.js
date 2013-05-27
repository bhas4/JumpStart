// Base App for Angular, that would wire up the remaining controllers / services etc.,

'use strict';

//all the directives will be added to this
var componentModule = angular.module('component', []);

//app for the user listing page
var donorApp = angular.module('donorApp', ['ngResource', 'component'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/all', {
          templateUrl: '/public/js/angular/views/users.html',
          controller: 'UserCtrl'
        })
        .when('/visitor', {
          templateUrl: '/public/js/angular/views/visitors.html',
          controller: 'VisitorCtrl'
        })
        .when('/home', {
          templateUrl: '/public/js/angular/views/home.html',
          controller: 'HomeCtrl'
        })
        .otherwise({
          redirectTo: '/all'
        });
    }]);