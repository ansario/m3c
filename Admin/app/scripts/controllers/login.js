'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
    .controller('LoginCtrl', function($scope, $window, $http) {
    $scope.data = {};


    $scope.login = function() {
    var emailaddress = $scope.data.emailaddress;
    var password = $scope.data.password;


    $http ({
        url: 'http://45.79.159.147:3000/login',
        method: 'POST',
        data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(data) {

        if (data.data.token) {
          sessionStorage.setItem("token",data.data.token);
          $window.location.href = '/#/admin';
        } else {
          $window.location.href = '/#/login';
        }
      })
   }
})
