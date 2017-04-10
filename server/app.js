/**
 * Module dependencies
 */
var express = require('express'),
    bodyparser = require('body-parser'),
    ejs = require('ejs'),
    Nexmo = require('nexmo'),
    socketio = require('socket.io'),
    config = require('../config/config'),
    userRoute = require('./routes/userRoute')();
/**
 * Module variables
 */
var app = express();
//nexmo configuration
var nexmo = new Nexmo({
    apiKey: config.nexmo.api_key,
    apiSecret: config.nexmo.api_secret
}, { debug: true });


/**
 * Middleware definition
 */

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

/**
 * Defne routes
 */
app.use('/users', userRoute);

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    res.send(req.body);

    var toNumber = req.body.number;
    var text = req.body.text;

    var data = {};

    nexmo.message.sendSms(
        config.number, toNumber, text, { type: 'unicode' },
        function (err, responseData) {
            if (err)
                data = { error: err };
            else {
                if (responseData.messages[0]['error-text']) {
                    data = { error: responseData.messages[0]['error-text'] };
                } else {
                    var n = responseData.messages[0]['to'].substr(0, responseData.messages[0]['to'].length - 4) + '****';
                    data = { id: responseData.messages[0]['message-id'], number: n };
                }
                io.emit('smsStatus', data);
            }
        }
    );

    // Basic Number Insight - get info about the phone number
    nexmo.numberInsight.get({ level: 'basic', number: toNumber }, (err, responseData) => {
        if (err) console.log(err);
        else {
            console.dir(responseData);
        }
    });
});

module.exports = app;