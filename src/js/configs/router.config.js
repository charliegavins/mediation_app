angular
.module('mediationApp')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$rootScopeProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider, $rootScopeProvider) {
  $locationProvider.html5Mode(true);

$stateProvider
  .state('form', {
    url: '/form',
    component: 'formComponent'
  }).state('form.personal', {
    url: '/personal',
    component: 'personalComponent'
  }).state('form.work', {
    url: '/work',
    component: 'workComponent'
  }).state('form.address', {
    url: '/address',
    component: 'addressComponent'
  }).state('form.result', {
    url: '/result',
    component: 'resultComponent'
  });

  $urlRouterProvider.otherwise('/');
}
