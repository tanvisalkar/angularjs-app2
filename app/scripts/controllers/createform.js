'use strict';

/**
 * @ngdoc function
 * @name angularjsAppApp.controller:CustomformsCtrl
 * @description
 * # CreateformCtrl
 * Controller of the angularjsAppApp
 */
angular.module('angularjsApp2App')
    .controller('CreateformCtrl', ["$scope", "$http", "ENV", "$sessionStorage", function($scope, $http, ENV, $sessionStorage) {
        console.log("enters CreateformCtrl===")
        $scope.submitted = false
        $scope.userErrorMessage = ""
        $scope.hasUserErrorMessage = false
        $scope.hasSuccess = false
        $scope.successMsg = ""
        $scope.form = {};
        $scope.submitForm = function(formvalid) {
            $scope.submitted = true
            $scope.form.jsonSchema = {}
            $scope.form.create = true
            console.log("formvalid==" + formvalid)
            if (formvalid) {
                $http({
                    method: 'POST',
                    url: ENV.baseUrl + 'customform',
                    data: $scope.form, // pass in data as strings
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + $sessionStorage["userdetails"]["token"]
                    } // set the headers so angular passing info as form data (not request payload)
                }).then(function(data) {
                    console.log(data);
                    $scope.hasSuccess = true
                    $scope.successMsg = data.data.response.message
                }).catch(function(data, status) {
                    if (data.status == 401) {
                        //signout()
                    }
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