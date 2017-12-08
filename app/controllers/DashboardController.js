var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware')
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    
    app.use('/dashboard', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    const findAllTransactions = Transaction.findAll({ 
        where: {userId: req.session.passport.user },
        order: 'transaction_date DESC',
        limit: 4
    });
    const sumAllExpenses = Transaction.sum('amount', { where: { typeId: 1, userId: req.user.id } });
    const sumAllIncome = Transaction.sum('amount', { where: { typeId: 2, userId: req.user.id } });

    return Promise.join(findAllTransactions, sumAllExpenses, sumAllIncome, function (transactions, expensesAmount, incomeAmount) {
        
console.log(transactions);

        res.render('dashboard', {
            title: 'Panel glowny',
            lastTransactions: transactions,
            user: {
                email: req.user.email,
                id: req.user.id
            },
            expensesAmount: expensesAmount ? parseFloat(expensesAmount).toFixed(2) : 0,
            incomeAmount: incomeAmount ? parseFloat(incomeAmount).toFixed(2) : 0,
            timeNavVisibility: false
        });
    })
});
