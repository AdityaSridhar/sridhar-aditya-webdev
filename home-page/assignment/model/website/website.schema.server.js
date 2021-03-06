/**
 * Created by Aditya Sridhar on 3/19/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "Web_App_Maker.Website"});

    WebsiteSchema.pre('remove', function (next) {
        var website = this;
        this.model('PageModel').find({_id: {$in: this.pages}}).remove().exec()
            .then(function (pages) {
                return website.model('WidgetModel').find({_page: {$in: website.pages}}).remove().exec();
            })
            .then(function (widgets) {
                return website.model('UserModel').update({_id: website._user}, {$pull: {websites: website._id}}, next);
            });
    });

    return WebsiteSchema;
};
