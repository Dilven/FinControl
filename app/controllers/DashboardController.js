var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction,
    Budget = db.Budget;

module.exports = function (app) {
    
    app.use('/dashboard', authMiddleware, router);
};

router.get('/', function (req, res, next) {

    var date = new Date(),
        month = date.getMonth(),
        startDate = new Date(date.getFullYear(), date.getMonth(), +1, 1),
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, +1);
        
        var sortBy = 'transaction_date',
            sortId = 'id',  
            sortDesc = 'DESC';
        
    const findAllTransactions = Transaction.findAll({ 
        where: {userId: req.session.passport.user },
        order: [
            [`${sortBy}`,  `${sortDesc}`],
            [`${sortId}`, `${sortDesc}`]
        ],
        limit: 4
    });

    const monthlyBudget = Budget.findOne({where:{userId: req.user.id, month: month}});
    const sumAllExpenses = Transaction.sum('amount', { 
        where: {
        typeId: 1, userId: req.user.id,
        transaction_date: {
            $between: [startDate, endDate]
        }
    }     
 });

    const sumAllIncome = Transaction.sum('amount', { 
        where: { typeId: 2, userId: req.user.id,
        
        transaction_date: {
            $between: [startDate, endDate]  
        }
    }     
 });
 
    return Promise.join(findAllTransactions, sumAllExpenses, sumAllIncome, monthlyBudget, function (transactions, expensesAmount, incomeAmount, budget) {
        
        var budgetAmount = 0,
            toSpendMoney = 0;

        if(budget !== null) {
            toSpendMoney = budget.amount - expensesAmount;
            budgetAmount = budget.amount;
        } 

        res.render('dashboard', {
            title: 'Panel glowny',
            lastTransactions: transactions,
            user: {
                email: req.user.email,
                id: req.user.id
            },
            toSpendMoney:toSpendMoney ? parseFloat(toSpendMoney).toFixed(2) : 0,
            budget:budgetAmount ? parseFloat(budgetAmount).toFixed(2) : 0,
            expensesAmount: expensesAmount ? parseFloat(expensesAmount).toFixed(2) : 0,
            incomeAmount: incomeAmount ? parseFloat(incomeAmount).toFixed(2) : 0,
            timeNavVisibility: false
        });
    })
});
