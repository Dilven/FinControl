var LocalStrategy   = require('passport-local').Strategy;

var db = require('../app/models');
var bcrypt   = require('bcrypt-nodejs');

var User = db.User;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        return User.findById(id)
            .then((user) => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            })
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        
        process.nextTick(function() {
        
            User.findOne({ 
                where: {
                    email: email
                }
            }).then(function(user) {
        
                if (user) {
                    return done(null, false, req.flash('registerMessage', 'Ten email jest juz zajęty.'));
                } else {
    
                    var data = {}

                    var generateHash = function(password) {
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    };
                    
                    data.email = email;
                    data.password = generateHash(password);

                    return User.create(data)
                        .then((newUser, created) => {    
                            if (!newUser) {
                                return done(null, false);
                            }
                
                            if (newUser) {
                                return done(null, newUser);
                            }
                    });
                }        
            })
            .catch(function (err) {
                return done(err)
            })

            });
        
        }));


        passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
    
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ where: {
                    email: email
                }
            })
                .then((user) => {
                    // if there are any errors, return the error before anything else
                    
        
                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'Nie znaleziono takiego użytkownika')); // req.flash is the way to set flashdata using connect-flash
        
                        var isValidPassword = function(userpass, password) {
                            
                            return bcrypt.compareSync(password, userpass);
                
                        }

                    // if the user is found but the password is wrong
                    if (!isValidPassword(user.password, password))
                        return done(null, false, req.flash('loginMessage', 'Niepoprawne hasło')); // create the loginMessage and save it to session as flashdata
        
                    // all is well, return successful user
                    return done(null, user);
                })
                .catch(err => {
                    return done(err)
                })
        }));
        
}