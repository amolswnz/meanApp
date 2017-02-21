var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meanApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, ' connection error'));
db.once('open', function callback() {
    console.log('meanApp db opend');
});

var messageSchema = mongoose.Schema( {
    message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMsg;
Message.findOne().exec(function(err, data) {
    mongoMsg = data.message;
});

app.get('/partials/:partialsPath', function(req, res) {
    res.render('partials/' + req.params.partialsPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMsg: mongoMsg
    });
});

var port = 3000;
app.listen(port);

console.log("Runnign at http://locahost:" + port);
