angular
    .module('main')
    .factory('UserService', UserService);

function UserService($q, $log, $resource, $filter) {

    var resource = $resource('http://localhost:9000/users');

    return {
        create: create,
        getUsers: getUsers,
        getByUsername: getByUsername
    };

    function getUsers() {
        $log.info('Running getUsers');
        var future = $q.defer();

        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });

        return future.promise;
    }

    function getByUsername(userna) {
        $log.info('Running GetByUsername');
        var future = $q.defer();
        resource.query({
            username: userna
        }).$promise.then(function (result) {

            future.resolve(cleanResponse(result));
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function create(user) {

        var future = $q.defer();

        var promise = getByUsername(user.username);
        promise.then(function (duplicateUser) {
            if (duplicateUser.length !== 0) {
                future.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
            } else {
                resource.save(user).$promise.then(function (result) {
                    future.resolve({ success: true });
                });
            }            
        });
        return future.promise;
    }


    function cleanResponse(resp) {
        return JSON.parse(angular.toJson(resp));
    }
}