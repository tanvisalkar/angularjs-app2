'use strict';
angular.module('CommonServices', [])
    .factory('CustomFieldErrorMessages', [function() {
        this.error_messages = {
            "error.required": "This field is required"
        }

        this.getErrorMessages = function(error) {
            return this.error_messages[error];
        };

        return this;
    }]);