/**
 * Created by sridh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }
})();