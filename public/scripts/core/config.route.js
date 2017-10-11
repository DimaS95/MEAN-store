(function () {
  'use strict';

  angular.module('app')
    .config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');



      $stateProvider
     
          .state('home',{
          url: '/',
          cache: false,
          templateUrl: 'views/home.html',
          controller: 'homeCtrl',
          controllerAs : 'vm'
        })
        
         .state('profile',{
          url: '/profile',
          cache: false,
          templateUrl: 'views/login.html',
          controller: 'loginCtrl',
          controllerAs : 'vm'
        })

        .state('signup',{
          url: '/signup',
          cache: false,
          templateUrl: 'views/signup.html',
          controller: 'signupCtrl',
          controllerAs : 'vm'
        })

        .state('admin',{
          url: '/admin',
          cache: false,
          templateUrl: 'views/admin.html',
          controller: 'adminCtrl',
          controllerAs : 'vm',
          
        })

    

    }]);
})();
