var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware');

module.exports = function (app) {
    app.use('/analysis', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    
    res.render('analysis', {
        title: 'Analiza wydatków',
        navigation: [
            { name: 'Dzisiejszy'},
            { name: 'Tygodniowy'},
            { name: 'Miesieczny'},
        ],
        
    });
    
});