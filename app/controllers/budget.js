var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/budget', router);
};

router.get('/', function (req, res, next) {
    
    res.render('budget', {
        title: 'Budżet',
        lastExpenses: [
            { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'}
        ],
        user: {
            name: 'Jan',
            surname: 'Kowalski',
            budget: '500.29'
        },
        navigation: [
            { name: 'Na dziś'},
            { name: 'Tygodniowy'},
            { name: 'Miesieczny'},
        ],
        
    });
    
});