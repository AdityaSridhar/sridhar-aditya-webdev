/**
 * Created by sridh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.newWebsite = newWebsite;

        function newWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url('/user/'+vm.userId+'/website');
        }
    }
})();