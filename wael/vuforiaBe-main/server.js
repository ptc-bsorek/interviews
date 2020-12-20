const express = require('express'),
    mongoose = require('mongoose')
bodyParser = require('body-parser')
multipart = require('connect-multiparty')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//sorry for the name of the db :) but mlab change there privacy and integrate with atlas mongo and i had
// to create db in atlas and connect to it but didnt have a time so i connected to old db in mlab
var db = mongoose.connect('mongodb://wael1233:winteriscoming1@ds115749.mlab.com:15749/lessonsmanagement',{useNewUrlParser: true });


var app = express();
var port = process.env.PORT || 7003;
var mainRouter = require("./routes/MainRouter.js");
var morgan = require('morgan');

var multipartMiddleware = multipart();


process.on('uncaughtException', function (err) {
    console.error(err.stack);
});

//configure the app to use body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev')); // log every request to the console
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, __setxhr_');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(expressJwt({secret: 'todo-app-super-shared-secret',algorithms: ['HS256']}).unless({path: ['/api/auth']}));
app.route('/')
    .get(function (req, res) {
        res.send('Vuforia-  Backend - Server Is alive and kicking.!! ');
    });
app.post('/api/auth', function(req, res) {
    const body = req.body;
    if(body.username =='wael' && body.password == 'letmein')
    {
        var token = jwt.sign({userID: body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
        res.send({token:token});
    }
    else
    {
        res.sendStatus(401);
    }
});
app.use('/api', mainRouter());




app.listen(port, function () {
    console.log('----- Vuforia Backend Server running on port: ' + port);
});
