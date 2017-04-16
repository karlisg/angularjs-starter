function AppFooterController() {
    console.log('Running footer Controller');
}

var component = {
    templateUrl: 'main/footer/footer.html',
    controller: AppFooterController
}

angular
    .module('footer')
    .component('appFooter', component);
