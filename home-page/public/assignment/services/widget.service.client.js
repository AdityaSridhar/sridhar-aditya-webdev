/**
 * Created by sridh on 2/12/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =
            [
                { "_id": "123", "name": "Header Widget", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "name": "Header Widget", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "name": "Image Widget", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/1600/900/people/", "text":""},
                { "_id": "456", "name": "HTML Widget", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "name": "Header Widget", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "name": "YouTube Widget", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/nO6Sy6rx49k", "text": "" },
                { "_id": "789", "name": "HTML Widget", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var widgetTypes = ["HEADER", "IMAGE", "YOUTUBE", "HTML"];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "createTypedWidget": createTypedWidget
        };
        return api;

        function createWidget(pageId, widget){
            widget.pageId = pageId;
            widget._id = ((new Date()).getTime()).toString();
            widgets.push(widget);
            return angular.copy(widget);
        }

        function findWidgetsByPageId(pageId){
            var pageWidgets = [];
            for(var i in widgets){
                if(widgets[i].pageId === pageId){
                    pageWidgets.push(widgets[i]);
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    return angular.copy(widgets[i]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    switch(widgets[i].widgetType) {
                        case "YOUTUBE":
                        case "IMAGE":
                            widgets[i].width = widget.width;
                            widgets[i].url = widget.url;
                            widgets[i].text = widget.text;
                            widgets[i].name = widget.name;
                            break;
                        case "HEADER":
                            widgets[i].size = widget.size;
                            widgets[i].text = widget.text;
                            widgets[i].name = widget.name;
                            break;
                        case "HTML":
                            widgets[i].text = widget.text;
                            widgets[i].name = widget.name;
                            break;
                        default:
                            console.log("Reached default case in update widget");
                    }
                    break;
                }
            }
        }

        function deleteWidget(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i, 1);
                    break;
                }
            }
        }

        function getWidgetTypes() {
            return angular.copy(widgetTypes);
        }

        function createTypedWidget(pageId, wType) {
            var newWidgetData = {};
            switch (wType) {
                case "YOUTUBE":
                    newWidgetData = { "_id": "", "name": "YouTube Widget", "widgetType": "YOUTUBE", "pageId": "", "width": "100%", "url": "URL", "text": "Text"};
                    break;
                case "IMAGE":
                    newWidgetData = { "_id": "", "name": "Image Widget", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "URL", "text":"Text"};
                    break;
                case "HEADER":
                    newWidgetData = { "_id": "", "name": "Header Widget", "widgetType": "HEADER", "pageId": "", "size": 2, "text": "Text"};
                    break;
                case "HTML":
                    newWidgetData = { "_id": "", "name": "HTML Widget", "widgetType": "HTML", "pageId": "", "text": "<p>Lorem ipsum</p>"};
                    break;
                default:
                    console.log("Unknown Widget Type passed to createTypedWidget");
                    return null;
            }

            return createWidget(pageId, newWidgetData);
        }
    }
})();