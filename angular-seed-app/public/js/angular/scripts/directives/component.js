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
Directive that would demonstrate use of different types of scope variable declaration in association with parent scope
*/
componentModule.directive('loStyle', function($rootScope) {
  return {
    restrict: 'A',
    scope: {  //new scope defined, only variables declared below be accessible
      data:'=', //setup for 2-way data binding
      bg: '&',  //variable available as function to invoke on parent scope
      fs:'@'    //evaluated expression of parent scope, changing font size inside directive will not help
    },
    link: function(scope, elm, attr) {
      //invoke the parent scope function, using delegate & set it back to parent scope object
      scope.data.style.bgcolor = scope.bg();

      //this will not impact, as expression will override after this is set
      scope.fs = '24px';
    }
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