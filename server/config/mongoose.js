var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/meanApp');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, ' connection error'));
    db.once('open', function callback() {
        console.log('meanApp db opend');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            User.create({
                firstName: 'Asdf',
                lastName: 'Qwer',
                username: 'asdf'
            });
            User.create({
                firstName: 'Asdf1',
                lastName: 'Qwer1',
                username: 'adsf1'
            });
            User.create({
                firstName: 'Asdf2',
                lastName: 'Qwer2',
                username: 'asdf2'
            });
        }
    });
};
