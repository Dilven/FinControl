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
    var limit = 10;
    
    var page = req.query.page || 1;
    var sortBy = req.query.by || 'transaction_date';
    var sortOrder = req.query.order || 'DESC';
    
    const findAllTransactions = Transaction.findAll({ 
        where: {userId: req.session.passport.user },
        offset: (page - 1) * limit,
        limit: limit,
        order: `${sortBy} ${sortOrder}`
    });
    const sumAllExpenses = Transaction.sum('amount', { where: { typeId: 1 } });
    const sumAllIncome = Transaction.sum('amount', { where: { typeId: 2 } });
    
    return Promise.join(findAllTransactions, sumAllExpenses, sumAllIncome, function (data, expensesAmount, incomeAmount) {
        var transactions = [];
        data.forEach(el => {
            transactions.push(el.dataValues)
        })
        res.render('transactions', {
            title: 'Panel glowny',
            transactions: transactions,
            navigation: [
                { name: 'Dzis', target: '#transactions-today', active: true },
                { name: 'W tygodniu', target: '#transactions-week', active: false },
                { name: 'W miesiącu', target: '#transactions-month', active: false },
            ],
            expensesAmount,
            incomeAmount
        });
    })
    
    
});

router.post('/add', function (req, res, next) {
    
    var formData = req.body;
   
    formData.userId = req.session.passport.user;

    Date.prototype.addHours = function(h) {    
        this.setTime(this.getTime() + (h*60*60*1000)); 
        return this;   
    }

    formData.transaction_date = new Date(formData.transaction_date).addHours(1);
    
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