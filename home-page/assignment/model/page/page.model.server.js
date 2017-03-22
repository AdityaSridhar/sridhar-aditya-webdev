/**
 * Created by Aditya Sridhar on 3/19/2017.
 */

module.exports = function () {
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setDependencies: setDependencies
    };

    var mongoose = require("mongoose");
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var _model = null;

    return api;

    function setDependencies(model) {
        _model = model;
    }

    function createPage(websiteId, page) {
        return PageModel.create(page)
            .then(function (createdPage) {
                return PageModel.findByIdAndUpdate(createdPage._id, {_website: websiteId}, {new: true}).exec();
            })
            .then(function (updatedPage) {
                return _model.websiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(updatedPage._id);
                        return website.save();
                    })
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website: websiteId})
            .exec()
            .then(function (pages) {
                return pages;
            });
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId)
            .exec()
            .then(function (page) {
                return page;
            });
    }

    function updatePage(pageId, page) {
        return PageModel.findByIdAndUpdate(pageId, page, {new: true})
            .exec()
            .then(function (updatedPage) {
                return updatedPage;
            });
    }

    function deletePage(pageId) {
        return PageModel.findById(pageId)
            .exec()
            .then(function (page) {
                return page.remove();
            });
    }
};