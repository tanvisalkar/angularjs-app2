'use strict';

/**
 * @ngdoc function
 * @name angularjsAppApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularjsAppApp
 */
angular.module('angularjsApp2App')
    .controller('RegisterCtrl', ["$scope", "$http", "ENV", function($scope, $http, ENV) {
        console.log(ENV)
        console.log("RegisterCtrl ===")
        $scope.submitted = false
        $scope.heading = "Register"
        $scope.email = ""
        $scope.password = ""
        $scope.confirmPassword = ""
        $scope.userErrorMessage = ""
        $scope.hasUserErrorMessage = false
        $scope.hasSuccess = false
        $scope.successMsg = ""
        $scope.form = {};
        $scope.submitForm = function(formvalid) {
            $scope.submitted = true
            console.log("formvalid==" + formvalid)
            if (formvalid) {
                $http({
                    method: 'POST',
                    url: ENV.baseUrl + 'signup',
                    data: $scope.form, // pass in data as strings
                    headers: { 'Content-Type': 'application/json' } // set the headers so angular passing info as form data (not request payload)
                }).then(function(data) {
                    console.log(data);
                    $scope.hasSuccess = true
                    $scope.successMsg = data.data.response.message
                }).catch(function(data, status) {
                    $scope.hasUserErrorMessage = true
                    $scope.userErrorMessage = data.data.response.message
                    $scope.hasSuccess = false
                    $scope.successMsg = ""
                    console.log(data.data.response.message)
                    console.log($scope.hasUserErrorMessage + "==" + $scope.userErrorMessage)
                        //console.error('Gists error', status, data);
                });
            }
        }
    }]);