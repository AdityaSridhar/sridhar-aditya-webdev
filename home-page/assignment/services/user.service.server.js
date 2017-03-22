/**
 * Created by Aditya Sridhar on 2/25/2017.
 */
module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        model.createUser(newUser)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model.findUserById(userId)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model.updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.deleteUser(userId)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (error) {
                res.sendStatus(500).send(error);
            });
    }
};

