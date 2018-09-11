'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp2App
 * @description
 * # angularjsApp2App
 *
 * Main module of the application.
 */
var app = angular
    .module('angularjsApp2App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'config',
        'ngStorage',
        'AuthServices',
        'CommonServices'
    ]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'register'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/forms', {
            templateUrl: 'views/customforms.html',
            controller: 'CustomformsCtrl',
            controllerAs: 'customforms'
        })
        .when('/createform', {
            templateUrl: 'views/createform.html',
            controller: 'CreateformCtrl',
            controllerAs: 'createform'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            requiresAuthentication: true
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.directive('passwordConfirm', ['$parse', function($parse) {
    return {
        restrict: 'A',
        scope: {
            matchTarget: '=',
        },
        require: 'ngModel',
        link: function link(scope, elem, attrs, ctrl) {
            var validator = function(value) {
                ctrl.$setValidity('match', value === scope.matchTarget);
                return value;
            }

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);

            // This is to force validator when the original password gets changed
            scope.$watch('matchTarget', function(newval, oldval) {
                validator(ctrl.$viewValue);
            });

        }
    };
}]);





app.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
    Auth.init();
    $rootScope.getClass = function(path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
    $rootScope.$on('$routeChangeStart', function(event, next) {
        if (!Auth.checkPermissionForView(next)) {
            event.preventDefault();
            $location.path("/login");
        }
    });
}]);