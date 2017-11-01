var express = require('express'),
router = express.Router();

module.exports = function (app, passport) {
    app.get('/register', function (req, res, next) {
        res.render('register', {
            title: 'Register',
            message: req.flash('registerMessage')
        });
    })
    app.get('/login', function (req, res, next) {
        res.render('login', {
            title: 'Login',
            message: req.flash('loginMessage')
        });
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/dashboard',
    
            failureRedirect: '/login'
        }
    
    ));
};
