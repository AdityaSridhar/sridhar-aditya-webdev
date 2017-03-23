/**
 * Created by Aditya Sridhar on 3/22/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };

        var key = "3c166a8304dc20e0326516bd2b7b640a";
        var secret = "23477c2850c697f2";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();