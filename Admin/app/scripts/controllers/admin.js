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

      $scope.truncationLimit = 20;
      $scope.longString = "THIS IS A LONG STRING HAH Ha ha okay some more words please thank you bye"

      $http({
        url: 'http://45.79.159.147:3000/getall',
        method: 'GET'
      }).then(function(data) {
        $scope.allBodies = data;
        $scope.loading = false;
      });


});
