/**
 * Created by Aditya Sridhar on 2/25/2017.
 */

module.exports = function (app, model) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // var pages =
    //     [
    //         {"_id": "321", "name": "Japanese Art", "websiteId": "456", "description": "Lorem"},
    //         {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    //         {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    //     ];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        model.createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.findPageById(pageId)
            .then(function (page) {
                res.json(page);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        model.updatePage(pageId, newPage)
            .then(function (updatedPage) {
                res.json(updatedPage);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model.deletePage(pageId)
            .then(function (deletedPage) {
                res.json(deletedPage);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }
};