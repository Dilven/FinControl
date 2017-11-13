var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    app.use('/expenses', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    return Transaction.findAll({ where: { typeId: 1, userId: req.session.passport.user } }).then(data => {
        var expenses = [];
        data.forEach(el => {
            expenses.push(el.dataValues)
        })
        
        res.render('expenses', {
            title: 'Panel glowny',
            expenses: expenses,
            // expenses: [
            //     { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            //     { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            //     { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            //     { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            //     { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
            //     { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
            //     { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenadasl vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'},
            //     { name: 'Mecz Arsenasdaal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'}
            // ],
            navigation: [
                { name: 'Dzis'},
                { name: 'W tygodniu'},
                { name: 'W miesiącu'},
            ],
            
            
            
        });
    })
    
    
});

router.post('/add', function (req, res, next) {
    var formData = req.body;
    formData.typeId = 1
    formData.userId = req.session.passport.user

    console.log(req.session)

    delete formData.transaction_date
    
    return Transaction.create(formData)
        .then((data) => {
            console.log(data);
            res.status(200).send({
                message: 'Dodano wydatek'
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                message: 'Błąd dodawania transakcji!'
            })
        })
});