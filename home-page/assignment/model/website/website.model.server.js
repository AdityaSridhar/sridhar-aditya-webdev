/**
 * Created by Aditya Sridhar on 3/19/2017.
 */

module.exports = function () {
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setDependencies: setDependencies
    };

    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    var _model = null;

    return api;

    function setDependencies(model) {
        _model = model;
    }

    function createWebsiteForUser(userId, website) {
        return WebsiteModel.create(website)
            .then(function (createdWebsite) {
                return WebsiteModel.findByIdAndUpdate(createdWebsite._id, {_user: userId}, {new: true}).exec();
            })
            .then(function (updatedWebsite) {
                return _model.userModel.findUserById(userId)
                    .then(function (user) {
                        user.websites.push(updatedWebsite._id);
                        return user.save();
                    })
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId})
            .exec()
            .then(function (websites) {
                return websites;
            });
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId)
            .exec()
            .then(function (website) {
                return website;
            });
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.findByIdAndUpdate(websiteId, website, {new: true})
            .exec()
            .then(function (updatedWebsite) {
                return updatedWebsite;
            });
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.findById(websiteId)
            .exec()
            .then(function (website) {
                return website.remove();
            });
    }
};