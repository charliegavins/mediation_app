(function () {
    'use strict';

    angular
        .module('mediationApp')
        .component('workComponent', {
            templateUrl:  'js/views/work.html',
            controller: 'WorkController',
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
