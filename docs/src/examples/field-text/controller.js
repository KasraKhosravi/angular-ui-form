(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .controller('ExampleFieldTextController', ExampleFieldTextController)
    ;

    function ExampleFieldTextController($timeout) {
        var vm = this;

        // Default bindings
        vm.debug = false;
        vm.data = {
            title: 'Developer',
            company: 'Ravaj',
            address: '767 Fifth Avenue',
            city: 'New York',
            state: 'NY'
        };

        // Public methods
        vm.save = save;
        vm.saveWithErrors = saveWithErrors;

        // -- Public Methods -- //

        function save() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data.
            $timeout(function () {
                vm.loading = false;
                alert('Data saved.');
            }, 3000);
        }

        function saveWithErrors() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data, this time we pretend server has returned some validation errors.
            $timeout(function () {
                vm.loading = false;
                vm.errors = {
                    errors: ['This errors is about the whole form, not any specific field.'],
                    children: {
                        title: {
                            errors: ['This is a validation error sent from server!']
                        }
                    }
                };
            }, 3000);
        }
    }

})(angular);
