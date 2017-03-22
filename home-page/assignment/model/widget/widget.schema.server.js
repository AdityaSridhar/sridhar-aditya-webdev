/**
 * Created by Aditya Sridhar on 3/20/2017.
 */

module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "PageModel"},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "Web_App_Maker.Widget"});

    WidgetSchema.pre('remove', function (next) {
        this.model('PageModel').update({_id: this._page}, {$pull: {widgets: this._id}}, next);
    });
    return WidgetSchema;
};