var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware')

module.exports = function (app) {
    app.use('/dashboard', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    var lastExpenses = [
        { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
        { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
        { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
        { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
        
    ];
    
    res.render('dashboard', {
        title: 'Panel glowny',
        lastExpenses: lastExpenses,
        user: {
            email: req.user.email,
            id: req.user.id
        },
        timeNavVisibility: false
    });
    
});
