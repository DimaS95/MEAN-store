(function () {
  'use strict';

  angular.module('app')
    .controller('homeCtrl', [ '$scope', '$http', '$state', 'auth', '$window', homeCtrl]);

  function homeCtrl($scope, $http, $state, auth, $window) {
    var vm = this;
  vm.formData = {}; // clear the form so our user is ready to enter another
  vm.products = {};
    vm.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false
    };

    vm.products = $http.get('/api/allproducts')
        .success(function(data) {
            vm.products = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    vm.createProduct = function() {
        $http.post('/api/albums', vm.formData)
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
        $http.delete('/api/albums/' + id)
            .success(function(data) {
                vm.products = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
        vm.getProduct = function(id) {
        $http.get('/api/albums/' + id)
            .success(function(data) {
                vm.formProduct = data;
                 
               
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
       vm.updateProduct = function(id) {
        $http.put('/api/albums/' + id, vm.formProduct)
            .success(function(data) {
                vm.formProduct = {};
                vm.products = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    


    vm.logout = function () {
      $window.localStorage.removeItem('jwtToken');
    };

    


  }

})(); 