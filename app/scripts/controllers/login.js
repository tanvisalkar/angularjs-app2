'use strict';

/**
 * @ngdoc function
 * @name angularjsAppApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularjsAppApp
 */
angular.module('angularjsApp2App')
    .controller('LoginCtrl', ["$scope", "$http", "ENV", "$sessionStorage", "$location", "$rootScope", "Auth", function($scope, $http, ENV, $sessionStorage, $location, $rootScope, Auth) {
        $scope.heading = "Login"
        $scope.submitted = false
        $scope.email = ""
        $scope.password = ""
        $scope.token = ""
        $scope.hasUserErrorMessage = false
        $scope.userErrorMessage = ""

        if (Auth.isLoggedIn()) {
            $location.path("/dashboard");
        }
        $scope.submitForm = function(formvalid) {
            $scope.submitted = true
            console.log("formvalid==" + formvalid)
            if (formvalid) {
                $http({
                    method: 'POST',
                    url: ENV.baseUrl + 'login',
                    data: {
                        "email": $scope.email,
                        "password": $scope.password
                    }, // pass in data as strings
                    headers: { 'Content-Type': 'application/json' } // set the headers so angular passing info as form data (not request payload)
                }).then(function(data) {
                    console.log(data);
                    $sessionStorage.userdetails = { "token": data.data.response.data.token, "firstName": data.data.response.data.user.firstName, "lastName": data.data.response.data.user.lastName };
                    $scope.token = $sessionStorage.userdetails.token
                    console.log($sessionStorage.userdetails)
                    $rootScope.user = $sessionStorage.userdetails
                    $location.url('/dashboard');
                }).catch(function(data, status) {
                    console.log(data)
                    if (data["status"] == 401) {
                        console.log(status + "==" + data.data.response.message)
                        $scope.hasUserErrorMessage = true
                        $scope.userErrorMessage = data.data.response.message
                    }
                    $scope.hasSuccess = false
                    $scope.successMsg = ""

                    console.log($scope.hasUserErrorMessage + "==" + $scope.userErrorMessage)
                        //console.error('Gists error', status, data);
                });
            }
        }
    }]);