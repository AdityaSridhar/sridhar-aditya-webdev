/**
 * Created by Aditya Sridhar on 2/25/2017.
 */

module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets =
        [
            {
                "_id": "123",
                "name": "Header Widget",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 2,
                "text": "GIZMODO"
            },
            {
                "_id": "234",
                "name": "Header Widget",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum"
            },
            {
                "_id": "345", "name": "Image Widget", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/1600/900/people/", "text": ""
            },
            {"_id": "456", "name": "HTML Widget", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {
                "_id": "567",
                "name": "Header Widget",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum"
            },
            {
                "_id": "678", "name": "YouTube Widget", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/nO6Sy6rx49k", "text": ""
            },
            {"_id": "789", "name": "HTML Widget", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        newWidget._id = (Date.now()).toString();
        newWidget.pageId = pageId;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        if (allWidgetsForPage) {
            res.json(allWidgetsForPage);
        } else {
            res.sendStatus(404).send({message: 'No Widgets found'});
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        if (widget) {
            res.json(widget);
        } else {
            res.sendStatus(404).send({message: 'Widget not found'});
        }
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                switch (widgets[i].widgetType) {
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
                        res.sendStatus(404).send({message: "Reached default case in update widget"});
                        return;
                }
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};