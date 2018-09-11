'use strict';

/**
 * @ngdoc function
 * @name angularjsAppApp.controller:CustomformsCtrl
 * @description
 * # CustomformsCtrl
 * Controller of the angularjsAppApp
 */
angular.module('angularjsApp2App')
    .controller('CustomformsCtrl', ["$scope", "$http", "ENV", "$sessionStorage", function($scope, $http, ENV, $sessionStorage) {
        console.log("enters CustomformsCtrl===")
        $scope.slug = "forms"

        $scope.init = function() {
            console.log("enters initform ===")

            $http({
                method: 'GET',
                url: ENV.baseUrl + 'getCustomForm/' + $scope.slug,
                headers: {
                    'Authorization': 'Bearer ' + $sessionStorage["userdetails"]["token"]
                }
            }).then(function(data) {
                console.log(data.data.response.data);
                data.data.response.data["success"] = true
                $scope.$broadcast("custom_form:getFormData", data.data.response.data);
            }).catch(function(data, status) {
                console.log(data)
                if (data.status == 401) {
                    //logout()
                }
                $scope.$broadcast("custom_form:getFormData", { "success": false });

            });
        }
        $scope.init()
        $scope.saveform = function() {
            $scope.$broadcast("custom_form:submit");

        }

    }]);