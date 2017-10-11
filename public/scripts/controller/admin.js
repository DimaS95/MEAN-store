(function () {
  'use strict';

  angular.module('app')
    .controller('adminCtrl', [ '$scope', '$http', '$state', 'auth', '$window', adminCtrl]);
        
function adminCtrl($scope, $http, $state, auth, $window){
   var vm = this;
   vm.user = {};
   vm.products = {};
 
      vm.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false
    };
      vm.isAdmin = function() {
      return auth.isAdmin;
     
    };

    vm.logout = function(){
      auth.logout();
      $state.go('home');
    };

     (vm.changeState = function () {
      if (auth.isAuthed()) {
        $http.get('/profile')
          .success(function(data) {
            vm.name = data.name;
          })
          .error(function(data) {
            console.log('Error: ' + data.message);
          });

       getData();
      }
    })();

        vm.login = function()
        {
          
            $http.post('/admin',vm.user)
            .success(function(data){

             vm.changeState();
            })
            .error(function(data){
              $state.go('home');
            })
            
          
        };
        
         
      
        
    // when submitting the add form, send the text to the node API
    vm.createProduct = function() {
        $http.post('/api/products', vm.formData)
            .success(function(data) {
                vm.formData = {}; // clear the form so our user is ready to enter another
                vm.products = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    vm.deleteProduct = function(id) {
        $http.delete('/api/products/' + id)
            .success(function(data) {
                //vm.products = getData();
                 getData();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
           
    };
        vm.getProduct = function(id) {
        $http.get('/api/products/' + id)
            .success(function(data) {
                vm.formProduct = data;
                 
               
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
       vm.updateProduct = function(id) {
        $http.put('/api/products/' + id, vm.formProduct)
            .success(function(data) {
                vm.formProduct = {};
                vm.products = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
       
  
      }
        function getData(){
              $http.get('/api/products')
        .success(function(data) {
            vm.products = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
        }
    }
    })();

  
