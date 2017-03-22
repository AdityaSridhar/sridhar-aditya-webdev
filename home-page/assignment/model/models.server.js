/**
 * Created by Aditya Sridhar on 3/18/2017.
 */
module.exports = function () {
    var UserModel = require('./user/user.model.server.js')();
    var WebsiteModel = require('./website/website.model.server.js')();
    var PageModel = require('./page/page.model.server.js')();
    var WidgetModel = require('./widget/widget.model.server.js')();

    var model = {
        userModel: UserModel,
        websiteModel: WebsiteModel,
        pageModel: PageModel,
        widgetModel: WidgetModel
    };

    WebsiteModel.setDependencies(model);
    PageModel.setDependencies(model);
    WidgetModel.setDependencies(model);

    return model;
};