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
            { name: 'Dzis', target: '#analysis-today', active: true },
            { name: 'W tym miesiącu', target: '#analysis-month', active: false },
            { name: 'w tym roku', target: '#analysis-year', active: false },
        ],
        
    });
    
});