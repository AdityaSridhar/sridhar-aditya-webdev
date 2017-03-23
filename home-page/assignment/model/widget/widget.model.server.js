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
        // Need to retrieve the widgets from the page collection
        // to maintain sorted order.
        return _model.pageModel.findPageById(pageId)
            .then(function (page) {
                var orderedWidgetIDs = page.widgets;
                return WidgetModel.find({_id: {$in: orderedWidgetIDs}})
                    .exec()
                    .then(function (widgets) {
                        // Need to again sort the found widgets as $in does not
                        // guarantee retrieval in order.
                        return widgets.sort(function (a, b) {
                            return orderedWidgetIDs.indexOf(a._id) - orderedWidgetIDs.indexOf(b._id);
                        });
                    });
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
        // Maintain the widgets in the parent page's array in sorted order.
        // This makes it easy to maintain the order instead of manipulating
        // the widgets collection.
        return _model.pageModel.findPageById(pageId)
            .then(function (page) {
                var elem_at_initial_pos = page.widgets[start];
                page.widgets.splice(start, 1);
                page.widgets.splice(end, 0, elem_at_initial_pos);
                return page.save();
            });
    }
};