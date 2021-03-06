/**
 * Created by Aditya Sridhar on 2/25/2017.
 */

module.exports = function (app, model) {

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

    // var widgets =
    //     [
    //         {
    //             _id: "234",
    //             name: "Header Widget",
    //             pageId: "321",
    //             size: 4,
    //             text: "The Great Wave off Kanagawa",
    //             widgetType: "HEADER"
    //         },
    //         {
    //             _id: "456",
    //             name: "HTML Widget",
    //             pageId: "321",
    //             text: "<p>The Great Wave off Kanagawa (神奈川沖浪裏 Kanagawa-oki nami ura?, 'Under a wave off Kanagawa'), also known as The Great Wave or simply The Wave, is a woodblock print by the Japanese ukiyo-e artist Hokusai. It was published sometime between 1830 and 1833[1] in the late Edo period as the first print in Hokusai's series Thirty-six Views of Mount Fuji. It is Hokusai's most famous work, and one of the most recognizable works of Japanese art in the world. The image depicts an enormous wave threatening boats off the coast of the prefecture of Kanagawa. While sometimes assumed to be a tsunami, the wave is more likely to be a large rogue wave.[2] As in all the prints in the series, it depicts the area around Mount Fuji under particular conditions, and the mountain itself appears in the background.</p>",
    //             widgetType: "HTML"
    //         },
    //         {
    //             "_id": "345", "name": "Image Widget", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //             "url": "", "text": ""
    //         },
    //         {
    //             _id: "123",
    //             name: "Header Widget",
    //             pageId: "321",
    //             size: 2,
    //             text: "The Eye of Hokusai",
    //             widgetType: "HEADER"
    //         },
    //         {
    //             _id: "678",
    //             name: "YouTube Widget",
    //             pageId: "321",
    //             text: "",
    //             url: "https://youtu.be/5GW3GJIV8uI",
    //             widgetType: "YOUTUBE",
    //             width: "100%"
    //         },
    //         {
    //             _id: "567",
    //             name: "Header Widget",
    //             pageId: "321",
    //             size: 4,
    //             text: "Katsushika Hokusai",
    //             widgetType: "HEADER"
    //         },
    //         {
    //             _id: "789",
    //             name: "HTML Widget",
    //             pageId: "321",
    //             text: "<p>Japanese artist, ukiyo-e painter and printmaker of the Edo period.[1] He was influenced by Sesshū Tōyō and other styles of Chinese painting.[2] Born in Edo (now Tokyo), Hokusai is best known as author of the woodblock print series Thirty-six Views of Mount Fuji (富嶽三十六景 Fugaku Sanjūroku-kei?, c. 1831) which includes the internationally iconic print, The Great Wave off Kanagawa. Hokusai created the ' Thirty-Six Views' both as a response to a domestic travel boom and as part of a personal obsession with Mount Fuji.[3] It was this series, specifically The Great Wave print and Fine Wind, Clear Morning, that secured Hokusai’s fame both in Japan and overseas. As historian Richard Lane concludes, 'Indeed, if there is one work that made Hokusai's name, both in Japan and abroad, it must be this monumental print-series'.[4] While Hokusai's work prior to this series is certainly important, it was not until this series that he gained broad recognition.</p>",
    //             widgetType: "HTML"
    //         }
    //     ];

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        model.createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model.updateWidget(widgetId, widget)
            .then(function (updatedWidget) {
                res.json(updatedWidget);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidgetPosition(req, res) {
        var pageId = req.params.pageId;
        var initial_index = parseInt(req.query.initial);
        var final_index = parseInt(req.query.final);

        model.reorderWidget(pageId, initial_index, final_index)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.deleteWidget(widgetId)
            .then(function (deletedWidget) {
                res.json(deletedWidget);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var myFile = req.file;

        model.findWidgetById(widgetId)
            .then(function (imgWidget) {
                // Replace existing image.
                if (imgWidget.url) {
                    fs.unlink(uploadsFolderPath + "/" + imgWidget.icon, function () {
                    });
                }

                imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

                // Store off filename for easy retrieval during unlinking.
                imgWidget.icon = myFile.filename;

                model.updateWidget(widgetId, imgWidget)
                    .then(function (updatedWidget) {
                        res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + updatedWidget._page + "/widget");
                    })
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }
};