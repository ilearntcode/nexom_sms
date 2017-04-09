/**
 * Module dependencies
 */
var express = require('express'),
    bodyparser = require('body-parser'),
    userRoute = require('./routes/userRoute')();
/**
 * Module variables
 */
var app = express();

/**
 * Middleware definition
 */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('/public'));

/**
 * Defne routes
 */
app.use('/users', userRoute);

app.get('/', function(req, res) {
    res.send('Am working');
})

module.exports = app;