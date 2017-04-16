angular
    .module('main')
    .factory('AuthenticationService', AuthenticationService);

function AuthenticationService($rootScope, $log, UserService) {

    var user = null;

    return {
        login: login,
        clearCredentials: clearCredentials,
        setCredentials: setCredentials
    };

    function clearCredentials() {
        $log.info('Running clearCredentials');
        $rootScope.globals = {};
    }

    function login(username, password, callback) {
        $log.info('usuario', username, password);

        var response;
        var promise = UserService.getByUsername(username);
        promise.then(function (user) {
            if (user.length !== 0 && user[0].password === password) {
                response = { success: true };
            } else {
                response = { success: false, message: 'Username or password is incorrect' };
            }
            callback(response);
        });
    }

    function setCredentials(username, password) {
        $log.info('Running setCredentials', username, password);
        $rootScope.globals = {
            currentUser: {
                username: username,
                password: password
            }
        };
    }
}
