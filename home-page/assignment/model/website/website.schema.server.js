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
    }, {collection: "webappmaker.website"});

    WebsiteSchema.pre('remove', function (next) {

        this.model('PageModel').find({_id: {$in: this.pages}}).remove()
            .then(function (docs) {
                console.log(docs);
            });
        this.model('UserModel').update(
            {_id: this._user},
            {$pull: {websites: this._id}},
            next
        );
    });

    return WebsiteSchema;
};
