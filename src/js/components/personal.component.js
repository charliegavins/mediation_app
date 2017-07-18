(function () {
    'use strict';

    angular
        .module('mediationApp')
        .component('personalComponent', {
            templateUrl:  'js/views/personal.html',
            controller: 'PersonalController',
            controllerAs: 'vm',
            require: {
                // access to the functionality of the parent component called 'formComponent'
                parent: '^formComponent'
            },
            bindings: {
                // send a changeset of 'formData' upwards to the parent component called 'formComponent'
                formData: '<'
            }
        })
})();
