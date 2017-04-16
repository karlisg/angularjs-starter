angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main',
       redirectTo:'login'
    })
    .state('login', {
      parent: 'app',   // relaciona list con app, para que siga mostranto header y footer
      url: 'login',
      // definir subrutas por debajo del main
      component: 'appLogin'  //nombre del componente no HTML
    })
    .state('home', {
      parent: 'app',   // relaciona list con app, para que siga mostranto header y footer
      url: 'home',
      // definir subrutas por debajo del main
      component: 'home'  //nombre del componente no HTML
    })
    
    ;

    
}
