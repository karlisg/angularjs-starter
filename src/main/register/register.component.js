function RegisterController(UserService, $rootScope, $state, FlashService) {
    console.log('Running Register Controller');
    var vm = this;

    vm.register = register;
    vm.cancel = cancel;

    function register() {
        vm.dataLoading = true;
        UserService.create(vm.user)
            .then(function (response) {
                if (response.success) {
                    FlashService.success('Registration successful', true);
                    $state.go('login');
                } else {
                    FlashService.error(response.message);
                    vm.dataLoading = false;
                }
            });
    }

    function cancel() {
        $state.go('login');
    }
}

var component = {
    templateUrl: 'main/register/register.html',
    controller: RegisterController
}

angular
    .module('register')
    .component('register', component);
