var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware')

module.exports = function (app) {
    app.use('/budget', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    
    res.render('budget', {
        title: 'Budżet',
        navigation: [
            { name: 'Na dziś'},
            { name: 'Tygodniowy'},
            { name: 'Miesieczny'},
        ]
        
    });
    
});