/**
 * Created by Aditya Sridhar on 3/20/2017.
 */

module.exports = function () {

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setDependencies: setDependencies
    };

    var mongoose = require("mongoose");
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var _model = null;

    return api;

    function setDependencies(model) {
        _model = model;
    }

    function createWidget(pageId, widget) {
        return WidgetModel.create(widget)
            .then(function (createdWidget) {
                return WidgetModel.findByIdAndUpdate(createdWidget._id, {_page: pageId}, {new: true}).exec();
            })
            .then(function (updatedWidget) {
                return _model.pageModel.findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(updatedWidget._id);
                        page.save();
                        return updatedWidget;
                    })
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId})
            .exec()
            .then(function (widgets) {
                return widgets;
            });
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId)
            .exec()
            .then(function (widget) {
                return widget;
            });
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.findByIdAndUpdate(widgetId, widget, {new: true})
            .exec()
            .then(function (updatedWidget) {
                return updatedWidget;
            });
    }

    function deleteWidget(widgetId) {
        return WidgetModel.findById(widgetId)
            .exec()
            .then(function (widget) {
                return widget.remove();
            });
    }

    function reorderWidget(pageId, start, end) {

    }

};