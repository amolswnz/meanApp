var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(pwd) {
            return hashPwd(this.salt, pwd) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'asdf');
            User.create({
                firstName: 'Asdf',
                lastName: 'Qwer',
                username: 'asdf',
                salt: salt,
                hashed_pwd: hash,
                roles: ['Admin']
            });
            salt = createSalt();
            hash = hashPwd(salt, 'asdf');
            User.create({
                firstName: 'Asdf1',
                lastName: 'Qwer1',
                username: 'adsf1',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
            salt = createSalt();
            hash = hashPwd(salt, 'asdf');
            User.create({
                firstName: 'Asdf2',
                lastName: 'Qwer2',
                username: 'asdf2',
                salt: salt,
                hashed_pwd: hash
            });
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}
function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}
