var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    app.use('/transactions', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    const findAllTransactions = Transaction.findAll({ where: {userId: req.session.passport.user } });
    const sumAllExpenses = Transaction.sum('amount', { where: { typeId: 1 } });

    return Promise.join(findAllTransactions, sumAllExpenses, function (data, expensesAmount) {
        var transactions = [];
        data.forEach(el => {
            transactions.push(el.dataValues)
        })
        res.render('transactions', {
            title: 'Panel glowny',
            transactions: transactions,
            navigation: [
                { name: 'Dzis'},
                { name: 'W tygodniu'},
                { name: 'W miesiącu'},
            ],
            expensesAmount
        });
    })
    
    
});

router.post('/add', function (req, res, next) {
    
    var formData = req.body;
   
    formData.userId = req.session.passport.user;

    delete formData.transaction_date
    
    return Transaction.create(formData)
        .then((data) => {
            res.status(200).send({
                data: data,
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