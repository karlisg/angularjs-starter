function AppLoginController($location, AuthenticationService, FlashService) {
    console.log('Running login Controller');
    var vm = this;
   
    initController();

    function initController() {
        AuthenticationService.clearCredentials();
    }

    vm.login = function () {
        console.log('This is the log for:', vm.username);
        vm.dataLoading = true;
        AuthenticationService.login(vm.username, vm.password, function (response) {
            if (response.success) {
                AuthenticationService.setCredentials(vm.username, vm.password);
                $location.path('/home');
                console.log('loggin success');
            } else {
                console.log('loggin failed',response.message);
                FlashService.error(response.message);
                vm.message = response.message;
                vm.dataLoading = false;
            }
        });
    }    

     vm.removeMsg = function () {
         delete vm.message;
     }
}

var component = {
    templateUrl: 'main/login/login.html',
    controller: AppLoginController
}

angular
    .module('login')
    .component('appLogin', component);