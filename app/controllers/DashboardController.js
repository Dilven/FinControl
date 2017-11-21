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
    const findAllTransactions = Transaction.findAll({ where: {userId: req.session.passport.user } });
    const sumAllExpenses = Transaction.sum('amount', { where: { typeId: 1 } });
    const sumAllIncome = Transaction.sum('amount', { where: { typeId: 2 } });

    return Promise.join(findAllTransactions, sumAllExpenses, sumAllIncome, function (data, expensesAmount, incomeAmount) {
       
        
           
        var lastTransactions = [];
        if (data.lenght>4) {
            for(let i = data.length-1; i>data.length-5; i--) {
                lastTransactions.push(data[i])
            }
        } else {
            data.forEach(el => {
                lastTransactions.push(el.dataValues)
            })
        }
        
        res.render('dashboard', {
            title: 'Panel glowny',
            lastTransactions: lastTransactions,
            user: {
                email: req.user.email,
                id: req.user.id
            },
            expensesAmount,
            incomeAmount,
            timeNavVisibility: false
        });
    })
});
