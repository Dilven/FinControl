var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    db = require('../../models'),
    _ = require('lodash');
    

module.exports = function (app) {
    app.use('/api/charts', router);
};

router.get('/dashboard', function (req, res, next) {

    var date = new Date(),
        startDate = new Date(date.getFullYear(), date.getMonth(), +1, 1),
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, +1); 

    const categoriesMonthly = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
                transaction_date: {
                    $between: [startDate, endDate]
                    
                    }
                } 
            }
         ]
    });
    const budgetedMonths = db.Budget.findAll({
        where:{userId: req.user.id},
        order: [ 
            ['year', 'ASC'],
            ['month', 'ASC']
        ],
        limit: 12
    });
    
    
    return Promise.join(categoriesMonthly, budgetedMonths, function (categoryMonthly, budgetMonth) {
        var categoriesFromDb = categoryMonthly.map(categoryMonthly => categoryMonthly.dataValues)
        
        var categoriesForChartMonthly = [],
            budgetMonthsForChart = budgetMonth.map(budgetMonth => budgetMonth.dataValues);
        
        _.each(categoriesFromDb, (categoryMonthly) => {
            categoryMonthly.amount = 0;
            _.each(categoryMonthly.transactions, (transaction) => {
                categoryMonthly.amount += parseFloat(transaction.dataValues.amount);    
            })
            categoriesForChartMonthly.push(categoryMonthly);
        })
    
        res.status(200).send({
            categoriesForChartMonthly,
            budgetMonthsForChart
        })
    });
});

router.get('/analysis', function (req, res, next) {
    var date = new Date(),
        month = date.getMonth(),
        startDateMonthly = new Date(date.getFullYear(), date.getMonth(), +1, 1),
        endDateMonthly = new Date(date.getFullYear(), date.getMonth() +1, +1),
        startDateYear = new Date(new Date().getFullYear(), 0, +2);
        endDateYear = new Date(new Date().getFullYear()+1, 0, +1);

    const categoriesMonthly = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
                transaction_date: {
                    $between: [startDateMonthly, endDateMonthly]
                }
                } 
            }
         ]
    });
    const categoriesAnnual = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
                transaction_date: {
                    $between: [startDateYear, endDateYear]
                }
                } 
            }
         ]
    });



    const budgetedMonths = db.Budget.findAll({where:{userId: req.user.id}});
    const budgetedMonthsCategory = db.BudgetCategory.findAll({where:{userId: req.user.id, month:month}});
    
    return Promise.join(categoriesMonthly, categoriesAnnual, budgetedMonths, budgetedMonthsCategory, function (categoryMonthly,categoryAnnual, budgetMonth, budgetMonthCategory) {
       
        var categoriesFromDbMonthly = categoryMonthly.map(categoryMonthly => categoryMonthly.dataValues)
        var categoriesFromDbAnnual = categoryAnnual.map(categoryAnnual => categoryAnnual.dataValues)
        
        _
            
        var categoriesForChartMonthly = [],
            categoriesForChartAnnual = [],        
            categoriesForActiveMonth = [];

        _.each(categoriesFromDbAnnual, (categoryAnnual) => {
            categoryAnnual.amount = 0;
            _.each(categoryAnnual.transactions, (transaction) => {
                categoryAnnual.amount += parseFloat(transaction.dataValues.amount);
            })
            categoriesForChartAnnual.push(categoryAnnual);
        })

        _.each(categoriesFromDbMonthly, (categoryMonthly) => {
            categoryMonthly.amount = 0;
            categoryMonthly.amountActiveMonth = 0;
            _.each(categoryMonthly.transactions, (transaction) => {
                categoryMonthly.amount += parseFloat(transaction.dataValues.amount);

                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth()) {
                        categoryMonthly.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                    }    
            })
            categoriesForChartMonthly.push(categoryMonthly);
        })

        var budgetMonthsForChart = budgetMonth.map(budgetMonth => budgetMonth.dataValues),
            budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues);
        
        return res.status(200).send({
            categoriesFromDbAnnual,
            categoriesForChartMonthly,
            budgetMonthsForChart,
            budgetMonthsCategoryForChart,
        })
    });
});
