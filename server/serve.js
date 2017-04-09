/**
 * Module dependencies
 */
var app = require('./app');

/**
 * Module variables
 */
var port = process.env.port || 3000;

app.listen(port, function() {
    console.log('Server running on ', port);
});