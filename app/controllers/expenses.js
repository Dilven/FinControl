var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/expenses', router);
};

router.get('/', function (req, res, next) {
    
    res.render('expenses', {
        title: 'Panel glowny',
        expenses: [
            { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'}
        ],
        navigation: [
            { name: 'Dzis'},
            { name: 'W tygodniu'},
            { name: 'W miesiącu'},
        ],
        
        
    });
    
});