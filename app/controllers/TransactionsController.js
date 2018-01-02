var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction;
    Category = db.Category;
    _ = require('lodash');

module.exports = function (app) {
    app.use('/transactions', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    var limit = 9,
        page = req.query.page || 1,
        sortBy = req.query.by || 'transaction_date',
        sortId = 'id',  
        sortOrder = req.query.order || 'DESC',
        sortDesc = 'DESC';

    const findAllTransactions = Transaction.findAll({ 
        where: {userId: req.session.passport.user },
        offset: (page - 1) * limit,
        limit: limit,
        order: [
            [`${sortBy}`,  `${sortOrder}`],
            [`${sortId}`, `${sortDesc}`]
        ]
    });
    const sumAllExpenses = Transaction.sum('amount', { where: { typeId: 1 } });
    const sumAllIncome = Transaction.sum('amount', { where: { typeId: 2 } });
    const categoriesName = Category.findAll({});
    
    return Promise.join(findAllTransactions, sumAllExpenses, sumAllIncome, categoriesName, function (allTransactions, expensesAmount, incomeAmount, allCategoriesName) {
        var transactions = [],
            categoriesName = [];

        allTransactions.forEach(el => {
            transactions.push(el.dataValues)
        })

        _.each(allCategoriesName, (categoryName, index) => {
            categoriesName[index +1] = categoryName.dataValues;
        });

        res.render('transactions', {
            title: 'Transakcje',
            transactions: transactions,
            categoriesName: categoriesName,
            expensesAmount,
            incomeAmount,
            numPage: page,
            timeNavVisibility: false
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

router.post('/delete', function (req, res, next) {
    
    var userId = req.session.passport.user,
         id = req.body.id;

        deleteTransaction = Transaction.destroy({where:{userId: userId,id:id}});
    });
