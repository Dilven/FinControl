var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    db = require('../../models'),
    _ = require('lodash');
    

module.exports = function (app) {
    app.use('/api/charts', router);
};

router.get('/dashboard', function (req, res, next) {

    var date = new Date();

    const categories = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
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
    
    
    return Promise.join(categories, budgetedMonths, function (category, budgetMonth) {
        var categoriesFromDb = category.map(category => category.dataValues)
        
        var categoriesForChart = [],
            budgetMonthsForChart = new Array(12).fill(0);
            AllExpensesForMonth = new Array(12).fill(0);
            
        
        _.each(categoriesFromDb, (category) => {
            category.amount = 0;
            category.amountActiveMonth = 0;
                        
            _.each(category.transactions, (transaction) => {
                category.amount += parseFloat(transaction.dataValues.amount);  
                
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth()) {
                        category.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                }
                if (new Date(transaction.transaction_date).getFullYear() <= new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() > new Date().getMonth()) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() <= new Date().getMonth()) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }      
            })
            categoriesForChart.push(category);
        })

        _.each(budgetMonth, (budgetMonth) => {
            
            if(budgetMonth.dataValues.year <= new Date().getFullYear() && 
                budgetMonth.dataValues.month > new Date().getMonth()) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            if(budgetMonth.dataValues.year === new Date().getFullYear() && 
                budgetMonth.dataValues.month <= new Date().getMonth()) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            
        });
        console.log(budgetMonthsForChart)
    
        res.status(200).send({
            categoriesForChart,
            budgetMonthsForChart,
            AllExpensesForMonth,            
        })
    });
});

router.get('/analysis', function (req, res, next) {
    var date = new Date(),
        month = date.getMonth(),
        numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    const categories = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
                } 
            }
         ]
    });
    
    const budgetedMonths = db.Budget.findAll({where:{userId: req.user.id}});
    const budgetedMonthsCategory = db.BudgetCategory.findAll({where:{userId: req.user.id, month:month}});
    
    return Promise.join(categories, budgetedMonths, budgetedMonthsCategory, function (category, budgetMonth, budgetMonthCategory) {
       
        var categoriesFromDb = category.map(category => category.dataValues),
            categoriesForChart = [],
            budgetMonthsForChart = new Array(12).fill(0),
            AllExpensesForMonth = new Array(12).fill(0),
            AllExpensesForDay = new Array(numberOfDays + 1).fill(0);
            
        _.each(categoriesFromDb, (category, index) => {
            category.amount = 0;
            category.amountActiveMonth = 0;
            category.amountActiveDay = 0;

            _.each(category.transactions, (transaction) => {
                category.amount += parseFloat(transaction.dataValues.amount);
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth()) {
                        category.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                    }  
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth() &&
                    new Date(transaction.transaction_date).getDate() === new Date().getDate()) {
                        category.amountActiveDay += parseFloat(transaction.dataValues.amount);
                }     
                if (new Date(transaction.transaction_date).getFullYear() <= new Date().getFullYear() &&
                new Date(transaction.transaction_date).getMonth() > new Date().getMonth()) { 
                    AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
            }
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth()) { 
                        AllExpensesForDay[transaction.transaction_date.getDate()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() <= new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() > new Date().getMonth()) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() <= new Date().getMonth()) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
            });

            categoriesForChart.push(category);
        });

        _.each(budgetMonth, (budgetMonth) => {
            
            if(budgetMonth.dataValues.year <= new Date().getFullYear() && 
                budgetMonth.dataValues.month > new Date().getMonth()) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            if(budgetMonth.dataValues.year === new Date().getFullYear() && 
            budgetMonth.dataValues.month <= new Date().getMonth()) {
                budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            
        });

            budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues);
        
        return res.status(200).send({
            AllExpensesForMonth,
            AllExpensesForDay,
            categoriesForChart,
            budgetMonthsForChart,
            budgetMonthsCategoryForChart,
            
        })
    });
});
