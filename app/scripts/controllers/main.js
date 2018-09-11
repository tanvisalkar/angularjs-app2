'use strict';

/**
 * @ngdoc function
 * @name angularjsApp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp2App
 */
angular.module('angularjsApp2App')
    .controller('MainCtrl', ['$rootScope', '$location', function($rootScope, $location) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


    }]);