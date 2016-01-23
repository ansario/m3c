var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var flash       = require('connect-flash');
var mongoose    = require('mongoose');
var passport    = require('passport');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var configDB = require('./config/database.js'); // get our config file
connection = mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Key');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

require('./app/routes.js')(app, passport, jwt);

app.listen(port);
console.log('Listening on port: ' + port);
