(function () {
    'use strict';

angular
.module('mediationApp')
.component('formComponent', {
  templateUrl:  'js/views/form.html',
  controller: 'FormCtrl',
  controllerAs: 'form'
});
})();
