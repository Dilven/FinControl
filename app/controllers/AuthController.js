var express = require('express'),
router = express.Router();

module.exports = function (app, passport) {
    app.use('/auth', router);
    router.get('/login', function (req, res, next) {
        
          res.render('login', {
              title: 'Panel glowny',
      
          });
          
      });
      
      router.get('/signup', function (req, res, next) {
          
            res.render('signup', {
                title: 'Panel glowny',
        
            });
            
        });
      
      router.post('/signup', passport.authenticate('local-signup', {
          successRedirect: '/dashboard',
          failureRedirect: '/auth/signup'
      }
      
      ));
};

