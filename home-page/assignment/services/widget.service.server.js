/**
 * Created by Aditya Sridhar on 2/25/2017.
 */

module.exports = function (app) {

    var multer = require('multer');
    var fs = require('fs');
    var uploadsFolderPath = __dirname + '/../../public/uploads';
    var upload = multer({dest: uploadsFolderPath});

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget", updateWidgetPosition);
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
                "url": "", "text": ""
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

    function updateWidgetPosition(req, res) {
        console.log('Hello');
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        var allWidgetsForPage = widgets.filter(function (w) {
            return w.pageId == pageId;
        });

        widgets = widgets.filter(function (w) {
            return allWidgetsForPage.indexOf(w) < 0;
        });

        var elem_at_initial_pos = allWidgetsForPage[initial_index];
        allWidgetsForPage.splice(initial_index, 1);
        allWidgetsForPage.splice(final_index, 0, elem_at_initial_pos);

        widgets = widgets.concat(allWidgetsForPage);
        res.sendStatus(200);
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

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        imgWidget = widgets.find(function (i) {
            return i._id == widgetId;
        });

        // Replace existing image.
        if (imgWidget.url) {
            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }

        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        // Store off filename for easy retrieval during unlinking.
        imgWidget["fileName"] = myFile.filename;

        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
    }
};