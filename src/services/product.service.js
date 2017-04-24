angular
    .module('main')
    .factory('ProductService', ProductService);

function ProductService($q, $log, $resource) {

    var resource = $resource('http://localhost:9000/products/:id', {
        id: '@id'
    }, {
            update: {
                method: 'PUT'
            }
        });

    return {
        getProducts: getProducts,
        getById: getById,
        saveProduct: saveProduct,
        deleteProduct: deleteProduct
    };

    function getProducts() {
        $log.info('Running getProducts');
        var future = $q.defer();

        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });

        return future.promise;
    }

    function getById(prodId) {
        $log.info('Running GetByProductId');
        var future = $q.defer();
        resource.query({
            id: prodId
        }).$promise.then(function (result) {

            future.resolve(cleanResponse(result));
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function saveProduct(product) {

        var future = $q.defer();

        resource.update({
            id: product.id
        }, product).$promise.then(function (result) {
            future.resolve(cleanResponse(result));
        }).catch(function (error) {
            future.reject(error);
        });

        return future.promise;
    }

    function deleteProduct(_id) {

        var future = $q.defer();

        resource.delete({ id: _id }).$promise.then(function (result) {
            future.resolve(cleanResponse(result));
        }).catch(function (error) {
            future.reject(error);
        });

        return future.promise;
    }

    function cleanResponse(resp) {
        return JSON.parse(angular.toJson(resp));
    }
}