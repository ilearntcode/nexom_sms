/**
 * Module dependencies
 */
var express = require('express'),
    userService = require('../lib/user');

/**
 * Module variables
 */
var userRouter = express.Router();

var router = function() {
    userRouter.route('/')
        .get(function(req, res){
             res.json(userService.getAllUsers())
        });

    return userRouter;
};

module.exports = router;