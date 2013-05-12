//we are going to use this for creating new pledge
componentModule.directive('createUser', function(user) {
  return {
    restrict:'E',
    transclude: true,
    link: function(scope, elm, attr){

      scope.initForm = function(){
        //init the scope object
        scope.new_user = {first_name: null, last_name: null, age: null, email: null};
      }

      //called on click of generate offer button
      scope.openForm = function(){
        scope.initForm();
        elm.find('#ui_createuser').modal();
      }

      //used for handling close & anything else
      scope.closeForm = function(){
        elm.find('#ui_createuser').modal('hide');
      }
    },
    templateUrl: '/public/js/angular/views/create_user.html'
  };
});

/*
Helps in selecting the tab, currently clicked
*/
componentModule.directive('loTitles', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elm, attr) {
      var attrParams = scope.$eval(attr.loTitles);
      $rootScope.$on('$routeChangeSuccess', function(scope, next, current) {
        if(next.$$route && window.location.hash.indexOf(attrParams.tab) >= 0) {
          elm.siblings('.active').removeClass('active');
          elm.addClass('active');
          document.title = attrParams.title+" | Angular Seed App";
        }
      });
    }
  };
});