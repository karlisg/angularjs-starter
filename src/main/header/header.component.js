function AppHeaderController(){
    console.log('Running header Controller');
}

var component = {
     templateUrl: 'main/header/header.html',
    controller: AppHeaderController
}

angular
  .module('header')
  .component('appHeader',component);
