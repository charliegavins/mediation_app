(function () {
    'use strict';
 
    angular
        .module('mediationApp')
        .controller('AddressController', AddressController);
 
    AddressController.$inject = [];
 
    function AddressController() {
        var vm = this;
        vm.title = 'Where do you live?';
        vm.formData = {};
        
        vm.$onInit = activate;

        ////////////////

        function activate() {
            // get data from the parent component
            vm.formData = vm.parent.getData();
            console.log('Address feature loaded!');
        }
    }
})();