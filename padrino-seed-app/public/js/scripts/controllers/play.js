var PlayCtrl = function($scope, angularFire){
  var ref = new Firebase("https://liftoff.firebaseio.com/");
  $scope.messages = [];
  angularFire(ref, $scope, "messages");

  $scope.addMessage = function(){
    $scope.messages.push({from: $scope.from, body: $scope.body});
  }
}

wayApp.controller('PlayCtrl', PlayCtrl);