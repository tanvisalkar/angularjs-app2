'use strict';
angular.module('AuthServices', ['ngStorage'])
    .factory('Auth', ["$sessionStorage", "$rootScope", "$location", function($sessionStorage, $rootScope, $location) {
        var auth = {};
        auth.init = function() {
            if (auth.isLoggedIn()) {
                $rootScope.user = auth.currentUser();
            }
        };
        auth.checkPermissionForView = function(view) {
            if (!view.requiresAuthentication) {
                return true;
            }

            return userHasPermissionForView(view);
        };

        var userHasPermissionForView = function(view) {
            if (!auth.isLoggedIn()) {
                return false;
            }

            return true;
        };

        auth.currentUser = function() {
            return $sessionStorage.userdetails;
        };

        auth.isLoggedIn = function() {
            return $sessionStorage.userdetails != null;
        }

        auth.logout = function() {
            delete $sessionStorage.userdetails;
            delete $rootScope.user;
        };

        auth.signout = function() {
            auth.logout()
            $location.url("/login");
        }

        return auth;
    }]);