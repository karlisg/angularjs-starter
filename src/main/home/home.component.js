function HomeController(UserService, ProductService, $rootScope, $state, $uibModal) {
    console.log('Running Home Controller');
    var vm = this;

    vm.user = null;
    vm.allUsers = [];

    initController();

    function initController() {
        verifyLogin();
    }

    function verifyLogin() {

        if ($rootScope.hasOwnProperty('globals')) {
            loadCurrentUser();
            loadAllProducts();
        }
        else {

            $state.go('login');
        }
    }

    function loadCurrentUser() {
        
        console.log('currentuser: ', $rootScope.globals.currentUser.username);
        var promise = UserService.getByUsername($rootScope.globals.currentUser.username);
        promise.then(function (result) {
            console.log('result getByUsername ', result);
            vm.user = result;
        });
    }

    function loadAllUsers() {
        var promise = UserService.getUsers();
        promise.then(function (result) {
            console.log('result', result);
            //usando el result para renderizarlo!
            vm.users = result;
        }).catch(function (error) {
            console.log('Error found: ', error);
            vm.Error = 'Cannot find Users!';
        }).finally(function () {
            console.log('getUsers has finished!')
        });

        console.log('test async');
    }


    function loadAllProducts() {
        var promise = ProductService.getProducts();
        promise.then(function (result) {
            console.log('result', result);
            vm.products = result;
        }).catch(function (error) {
            console.log('Error found: ', error);
            vm.Error = 'Cannot find Products!';
        }).finally(function () {
            console.log('getProducts has finished!')
        });
    }

    vm.logout =function() {
         $state.go('login');
    }

    vm.setCategory = function (_category) {

        console.log('categorias:', _category);
        vm.category = _category;
    }

    vm.edit = function (_product) {
        var modalInstance = $uibModal.open({
            controller: ProductModalCtrl,
            templateUrl: 'main/home/add-edit-product.html',
            controllerAs: '$ctrl',
            resolve: {
                product: function () {
                    return _product;
                }
            }
        });
    }

    vm.delete = function (_id) {
        var confirmModalInstance = $uibModal.open({
            controller: ConfirmProductModalCtrl,
            templateUrl: 'main/home/confirm-product.html',
            controllerAs: '$ctrl',
            resolve: {
                id: function () {
                    return _id;
                }
            }
        });

        confirmModalInstance.result.then(function (response) {
            console.log('modal repsonse:', response);
            if (response === 'delete') {
                for (var i = 0; i < vm.products.length; i++) {
                    var p = vm.products[i];
                    if (p.id === _id) {
                        vm.products.splice(i, 1);
                        break;
                    }
                }
            }
        });
    };
}

function ProductModalCtrl($uibModalInstance, ProductService, product) {
    var vm = this;

    vm.productOriginal = product;

    vm.product = JSON.parse(JSON.stringify(product)); // Cloning an object
    vm.product.date = new Date(vm.product.startDate);

    vm.cancel = function () {
        $uibModalInstance.close('close');
    }

    vm.saveChanges = function () {
        vm.productOriginal.brand = vm.product.brand;
        vm.productOriginal.model = vm.product.model;
        vm.productOriginal.price = vm.product.price;
        vm.productOriginal.startDate = vm.product.date.toISOString().slice(0, 10).replace(/-/g, '/');

        var promise = ProductService.saveProduct(vm.productOriginal);
        promise.then(function (result) {
            console.log('Save Product', result);
        });

        $uibModalInstance.close('close');
    }

    vm.dtpVisibility = {
        opened: false
    };
    vm.dtpStatusSwitch = function () {
        vm.dtpVisibility.opened = true;
    }
}

function ConfirmProductModalCtrl($uibModalInstance, ProductService, id) {
    var vm = this;

    vm.cancel = function () {
        $uibModalInstance.close('close');
    }

    vm.ok = function () {
        var promise = ProductService.deleteProduct(id);
        promise.then(function (result) {
            console.log('Delete Product', result);

        });
        $uibModalInstance.close('delete');
    }

    vm.dtpVisibility = {
        opened: false
    };
    vm.dtpStatusSwitch = function () {
        vm.dtpVisibility.opened = true;
    }
}

var component = {
    templateUrl: 'main/home/home.html',
    controller: HomeController
};

angular
    .module('main')
    .component('home', component);



