(function () {
  'use strict';

  angular.module('app')
    .controller('profileCtrl', [ '$scope', '$http', '$state', 'auth', '$window', profileCtrl]);
        
function profileCtrl($scope, $http, $state, auth, $window){
   var vm = this;
    

      
       
        vm.logout = function()
        {
            auth.logout && auth.logout();
        };
        vm.isAuthed = function()
        {
            return auth.isAuthed ? auth.isAuthed() : false;
        };//end self.isAuthed
      }
    })();

  
