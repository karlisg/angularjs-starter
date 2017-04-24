function AppLoginController($location, AuthenticationService, FlashService) {

    console.log('Running login Controller');

    var vm = this;
    vm.login = loginUser;

    (function initController() {
        AuthenticationService.clearCredentials();
    })();

    function loginUser() {
        console.log('This is the log for:', vm.username);
        vm.dataLoading = true;
        AuthenticationService.login(vm.username, vm.password, function (response) {
            if (response.success) {
                AuthenticationService.setCredentials(vm.username, vm.password);
                $location.path('/home');
            } else {
                console.log('loggin failed', response.message);
                FlashService.error(response.message);
                vm.message = response.message;
                vm.dataLoading = false;
            }
        });
    }

     vm.removeMsg = function () {
         delete vm.message;
     }

    vm.closeAlert = function (index) {
        vm.alerts.splice(index, 1);
    };
}

var component = {
    templateUrl: 'main/login/login.html',
    controller: AppLoginController
}

angular
    .module('login')
    .component('appLogin', component);