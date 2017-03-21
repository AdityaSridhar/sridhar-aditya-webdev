/**
 * Created by Aditya Sridhar on 3/18/2017.
 */

module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "webappmaker.user"});

    return UserSchema;
};