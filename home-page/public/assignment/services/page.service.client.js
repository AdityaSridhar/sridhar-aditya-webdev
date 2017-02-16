/**
 * Created by sridh on 2/12/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            page._id = ((new Date()).getTime()).toString();
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId){
            var pagesForSite = [];
            for(var i in pages){
                if(pages[i].websiteId === websiteId){
                    pagesForSite.push(pages[i]);
                }
            }
            return pagesForSite;
        }

        function findPageById(pageId){
            for(var i in pages){
                if(pages[i]._id === pageId){
                    return angular.copy(pages[i]);
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            for(var i in pages){
                if(pages[i]._id === pageId){
                    pages[i].description = page.description;
                    pages[i].name = page.name;
                }
            }
        }

        function deletePage(pageId) {
            for(var i in pages){
                if(pages[i]._id === pageId){
                    pages.splice(i, 1);
                    break;
                }
            }
        }
    }
})();