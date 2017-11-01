var express = require('express'),
router = express.Router();

module.exports = function (app) {
    app.get('/register', function (req, res, next) {
        res.render('register', {
            title: 'Register'
        });
    })
    app.get('/login', function (req, res, next) {
        res.render('login', {
            title: 'Login'
        });
    })
};
