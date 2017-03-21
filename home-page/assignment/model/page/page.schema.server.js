/**
 * Created by Aditya Sridhar on 3/19/2017.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "webappmaker.pages"});

    PageSchema.pre('remove', function (next) {
        this.model('WebsiteModel').update(
            {_id: this._website},
            {$pull: {pages: this._id}},
            next
        );
    });

    return PageSchema;
};