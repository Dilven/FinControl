var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware')

module.exports = function (app) {
    app.use('/actions', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    
    res.render('actions', {
        title: 'Akcje',
        navigation: [
            { name: 'Na dziś'},
            { name: 'Tygodniowy'},
            { name: 'Miesieczny'},
        ]
        
    });
    
});