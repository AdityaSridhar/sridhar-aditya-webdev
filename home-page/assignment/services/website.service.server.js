/**
 * Created by Aditya Sridhar on 2/25/2017.
 */
module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    // var websites =
    //     [
    //         {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    //         {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    //         {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    //         {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    //         {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    //         {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    //     ];

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        model.createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model.findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        model.updateWebsite(websiteId, newWebsite)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }
};