import { Meteor } from "meteor/meteor";

Meteor.startup(function () {

    // process.env.MONGO_URL = 'mongodb://localhost:27017/myWebsite';

    // Setup smtp
    const username = 'smtp-username';
    const password = 'smtp-password';
    const server = 'your-smtp.server.com/org';
    const port = '587/25';

    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(username) + ':' +
        encodeURIComponent(password) + '@' +
        encodeURIComponent(server) + ':' + port;
});