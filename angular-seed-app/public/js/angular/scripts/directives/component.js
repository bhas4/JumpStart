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

      //invokes the service layer to make the AJAX call
      scope.addDonor2 = function(){
        //send the new user object to service layer
        user.create(scope.new_user, function(data){
          //on response, append the newly created user to list
          scope.donorUsers.push(data);

          //since we used a popup to create user form, close it
          scope.closeForm();
        });
      }

      //used for handling close & anything else
      scope.closeForm = function(){
        elm.find('#ui_createuser').modal('hide');
      }
    },
    templateUrl: '/public/js/angular/views/create_user.html'
  };
});
