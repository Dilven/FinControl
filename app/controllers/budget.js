var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/budget', router);
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