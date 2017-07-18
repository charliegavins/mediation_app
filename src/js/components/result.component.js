(function () {
    'use strict';

    angular
        .module('mediationApp')
        .component('resultComponent', {
            templateUrl:  'js/views/result.html',
            controller: 'ResultController',
            controllerAs: 'vm',
            require: {
                // access to the functionality of the parent component called 'formComponent'
                parent: '^formComponent'
            }
        })
})();
