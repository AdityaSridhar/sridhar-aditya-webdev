/**
 * Created by sridh on 2/12/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var widgetTypes = ["HEADING", "IMAGE", "YOUTUBE", "HTML", "TEXT"];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "createTypedWidget": createTypedWidget,
            "UpdateWidgetPosition": UpdateWidgetPosition
        };
        return api;

        function createWidget(pageId, widget){
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId){
            return $http.get("/api/page/" + pageId + "/widget");
        }

        function findWidgetById(widgetId){
            return $http.get("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget){
            return $http.put("/api/widget/" + widgetId, widget);
        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/" + widgetId);
        }

        function getWidgetTypes() {
            return angular.copy(widgetTypes);
        }

        function createTypedWidget(pageId, wType) {
            var newWidgetData = {};
            switch (wType) {
                case "YOUTUBE":
                    newWidgetData = {
                        "name": "YouTube Widget",
                        "type": "YOUTUBE",
                        "width": "100%",
                        "url": "URL",
                        "text": "Text"
                    };
                    break;
                case "IMAGE":
                    newWidgetData = {
                        "name": "Image Widget",
                        "type": "IMAGE",
                        "width": "100%",
                        "url": "URL",
                        "text": "Text"
                    };
                    break;
                case "HEADING":
                    newWidgetData = {
                        "name": "Header Widget",
                        "type": "HEADING",
                        "size": 2,
                        "text": "Text"
                    };
                    break;
                case "HTML":
                    newWidgetData = {"name": "HTML Widget", "type": "HTML", "text": "<p>Lorem ipsum</p>"};
                    break;
                case "TEXT":
                    newWidgetData = {"name": "Text Widget", "type": "TEXT", "text": ""};
                    break;
                default:
                    console.log("Unknown Widget Type passed to createTypedWidget");
                    return null;
            }

            return createWidget(pageId, newWidgetData);
        }

        function UpdateWidgetPosition(startIndex, finalIndex, pageId) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + finalIndex);
        }
    }
})();