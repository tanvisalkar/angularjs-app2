'use strict';

/**
 * @ngdoc function
 * @name angularjsAppApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularjsAppApp
 */
angular.module('angularjsApp2App')
    .controller('DashboardCtrl', ["$scope", "$http", "ENV", "$sessionStorage", "$rootScope", "Auth", "$location", function($scope, $http, ENV, $sessionStorage, $rootScope, Auth, $location) {
        $scope.heading = "Dashboard"
        $scope.username = $sessionStorage.userdetails.firstName + " " + $sessionStorage.userdetails.lastName

        $rootScope.logout = function() {
            Auth.logout();
            $location.path("/login");
        };
    }]);