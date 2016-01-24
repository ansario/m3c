'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')
    .controller('AdminCtrl', function($scope, $window, $http) {
      $scope.data = {};
      $scope.loading = true;

      $scope.truncationLimit = 70;

      $http({
        url: 'http://45.79.159.147:3000/getall',
        method: 'GET'
      }).then(function(data) {
        $scope.allBodies = data.data;
        $scope.loading = false;
      });


})
  .filter('tableDescription', function() {
    return function(input) {
      var arr = Object.keys(input);
      return arr.filter(function (element, index, array) {
          return input[element] && input[element] !== "Unknown" && input[element] !== "";
        })
        .reduce(function (prev, curr) {
          return prev + curr + ': ' + input[curr] + ', ';
        }, '');
    };
  });
