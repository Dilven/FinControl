var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware')
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    app.use('/dashboard', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    return Transaction.findAll({ where: { userId: req.session.passport.user } }).then(data => {
        var budget = 0;
        Transaction.sum('amount').then(sum => {
        
           budget = sum;
           
        var lastTransactions = [];
        for(let i = data.length-1; i>data.length-5; i--) {
            lastTransactions.push(data[i])
        }
            res.render('dashboard', {
                title: 'Panel glowny',
                lastTransactions: lastTransactions,
                user: {
                    email: req.user.email,
                    id: req.user.id
                },
                budget: budget,
                timeNavVisibility: false
            });
        }) 
    })
});
