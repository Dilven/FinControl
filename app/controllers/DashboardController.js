var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/dashboard', router);
};

router.get('/', isLoggedIn, function (req, res, next) {
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
            name: 'Jan',
            surname: 'Kowalski',
            budget: '500.29'
        },
        timeNavVisibility: false
    });
    
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}