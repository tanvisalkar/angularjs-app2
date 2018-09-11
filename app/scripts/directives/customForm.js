'use strict';


angular.module('angularjsApp2App')
    .directive('customForm', ['$parse', 'CustomFieldErrorMessages', '$http', 'ENV', '$sessionStorage', function($parse, customFieldErrorMessages, $http, ENV, $sessionStorage) {
        return {
            restrict: 'A',
            template: '<form name="{{custom_form_name}}" id="{{custom_form_id}}" class="custom-form" novalidate></form>',
            scope: {
                "custom_form_name": "@customFormName",
                "custom_form_id": "@customFormId"
            },
            replace: true,
            link: function link(scope, elem, attrs, ctrl) {
                var form_values = {}
                var jsFormOpts = {}


                var return_cleaned_errors = function(errors) {
                    var final_errors = [];
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i].attribute == "required") {
                            errors[i].message = customFieldErrorMessages.getErrorMessages("error.required");
                        }

                        final_errors.push(errors[i]);
                    }

                    return final_errors;
                }

                var jsForm;

                scope.validate_form = function() {
                    // Validate the form
                    // Set current angular form validity as well as parent form validity
                    var errorObj = jsForm.validate();
                    //scope.formErrors = errorObj;

                    // var form_name = element.attr("name");
                    // if (!errorObj.errors) {
                    //     scope[form_name].$setValidity(null, true);
                    // }

                    console.log("errors")
                    errorObj.errors = return_cleaned_errors(errorObj.errors);
                    console.log(errorObj.errors)
                        //scope[form_name].$setValidity(null, !(errorObj.errors.length > 0));
                }

                scope.validate_and_submit_form = function() {
                    scope.validate_form();
                    jsForm.submit();
                    console.log(jsForm.formDesc)
                    var jsonSchema = jsForm.formDesc
                    jsonSchema.value = form_values
                    $http({
                        method: 'POST',
                        url: ENV.baseUrl + 'customform',
                        data: { 'jsonSchema': jsonSchema, 'tableName': scope.custom_form_name, 'tableId': scope.custom_form_id, 'slug': 'forms' }, // pass in data as strings
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + $sessionStorage.userdetails['token']
                        } // set the headers so angular passing info as form data (not request payload)
                    }).then(function(data) {
                        console.log(data);
                    }).catch(function(data, status) {

                    });

                }

                scope.get_form_data = function(evt, data) {
                    console.log("get_form_data====")
                    console.log(data)
                    if (data.success == false) {
                        jsFormOpts = {
                            schema: {
                                name: {
                                    type: 'string',
                                    title: 'Name',
                                    required: true
                                },
                                age: {
                                    type: 'number',
                                    title: 'Age'
                                }
                            },

                        };




                    } else {
                        jsFormOpts = data[0].jsonSchema
                    }
                    jsFormOpts.onSubmit = function(errors, values) {
                        console.log("enters")
                        var final_errors = return_cleaned_errors(errors);
                        console.log("ERRORS====")
                        console.log(final_errors)
                        $('#' + scope.custom_form_id).jsonFormErrors(final_errors, jsFormOpts);
                        console.log("values===")
                        console.log(values)
                        form_values = values
                    };
                    jsFormOpts.displayErrors = function(errors, formElt) {
                        var final_errors = return_cleaned_errors(errors);
                        console.log("ERRORS====")
                        console.log(final_errors)
                        $(formElt).jsonFormErrors(final_errors, jsFormOpts);
                    };
                    jsForm = $(elem).jsonForm(jsFormOpts);
                }

                // Validate form when event broadcasted
                scope.$on("custom_form:validate", scope.validate_form);

                // Validate and submit form when event broadcasted
                scope.$on("custom_form:submit", scope.validate_and_submit_form);

                scope.$on("custom_form:getFormData", scope.get_form_data);



            }
        };
    }]);