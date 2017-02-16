/**
 * Created by sridh on 2/12/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebSiteService);

    function WebSiteService() {
        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website){
            website.developerId = userId;
            website._id = ((new Date()).getTime()).toString();
            websites.push(website);
        }

        function findWebsitesByUser(userId){
            var userSites = [];
            for(var i in websites){
                if(websites[i].developerId === userId){
                    userSites.push(websites[i]);
                }
            }
            return userSites;
        }
        function findWebsiteById(websiteId){
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    return angular.copy(websites[i]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    websites[i].description = website.description;
                    websites[i].name = website.name;
                    return angular.copy(websites[i]);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    websites.splice(i, 1);
                    break;
                }
            }
        }
    }
})();