/**
 * Created by Aditya Sridhar on 3/18/2017.
 */

module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setDependencies: setDependencies
    };

    var mongoose = require('mongoose');
    mongoose.connect("mongodb://127.0.0.1:27017/webappmaker");

    var q = require('q');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model = null;

    return api;

    function setDependencies(model) {
        model = model;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (error, user) {
            if (error) {
                deferred.abort(error);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (error, user) {
            if (error) {
                deferred.abort(error);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (error, user) {
            if (error) {
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function (error, user) {
            if (error) {
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, user, {new: true}, function (error, updatedUser) {
            if (error) {
                deferred.abort();
            }
            else {
                deferred.resolve(updatedUser);
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId, function (error, user) {
            if (error) {
                deferred.abort();
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
};