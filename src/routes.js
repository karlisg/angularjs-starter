angular
  .module('app')
  .config(routesConfig)
  .run(run);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main',
      redirectTo: 'login'
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
    .state('edit', {
      parent: 'app',
      url: 'edit/:id',
      component: 'addEditProduct'
    })
    .state('register', {
      parent: 'app',   // relaciona list con app, para que siga mostranto header y footer
      url: 'register',
      // definir subrutas por debajo del main
      component: 'register'  //nombre del componente no HTML
    });

}

function run($rootScope, $location, $cookies, $http) {
  // Mantiene al usuario logueado despues de un refresh
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // Redirecciona a la pagina de login si no esta logueado y quiere acceder a paginas restringidas
    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/login');
    }
  });
}