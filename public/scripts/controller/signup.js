(function () {
  'use strict';

  angular.module('app')
    .controller('signupCtrl', [ '$scope', '$http', '$state', 'auth', '$window', signupCtrl]);

  function signupCtrl($scope, $http, $state, auth, $window) {
    var vm = this;
    vm.user = {};
 

    

    // when submitting the add form, send the text to the node API
    vm.signup = function() {
        $http.post('/registration', vm.user)
            .success(function(data) {
                $state.go('home');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    

    


  }

})(); 