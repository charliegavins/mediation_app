angular
  .module('mediationApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['CurrentUserService', '$state'];
function HomeCtrl(CurrentUserService, $state) {

}
