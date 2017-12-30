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
        month = date.getMonth(),
        year = date.getFullYear(),
        day = date.getDate();


    const budgetedMonthsCategory = db.BudgetCategory.findAll({where:{userId: req.user.id, month:month}});
    
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
    
    
    return Promise.join(categories, budgetedMonths, budgetedMonthsCategory, function (category, budgetMonth, budgetMonthCategory) {
        
        var categoriesFromDb = category.map(category => category.dataValues),
            budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues),
            categoriesForChart = [],
            budgetMonthsForChart = new Array(12).fill(0),
            AllExpensesForMonth = new Array(12).fill(0);
            
        _.each(categoriesFromDb, (category) => {
            category.amount = 0;
            category.amountActiveMonth = 0;
                        
            _.each(category.transactions, (transaction) => {
                category.amount += parseFloat(transaction.dataValues.amount);  
                
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month) {
                        category.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                }
                if (new Date(transaction.transaction_date).getFullYear() <= year &&
                    new Date(transaction.transaction_date).getMonth() > month) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() <= month) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }      
            })
            categoriesForChart.push(category);
        })

        _.each(budgetMonth, (budgetMonth) => {
            
            if(budgetMonth.dataValues.year <= year && 
                budgetMonth.dataValues.month > month) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            if(budgetMonth.dataValues.year === year && 
                budgetMonth.dataValues.month <= month) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }  
        });
     
        res.status(200).send({
            categoriesForChart,
            budgetMonthsForChart,
            AllExpensesForMonth,
            budgetMonthsCategoryForChart,           
        })
    });
});

router.get('/analysis', function (req, res, next) {
    var date = new Date(),
        month = date.getMonth(),
        year = date.getFullYear(),
        day = date.getDate(),
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
    const categoriesIncome = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 2,
                userId: req.user.id ,
                } 
            }
         ]
    });
    
    const budgetedMonths = db.Budget.findAll({where:{userId: req.user.id}});
    const budgetedMonthsCategory = db.BudgetCategory.findAll({where:{userId: req.user.id, month:month}});
    
    return Promise.join(categories, categoriesIncome, budgetedMonths, budgetedMonthsCategory, function (category, categoryIncome, budgetMonth, budgetMonthCategory) {
       
        var categoriesFromDb = category.map(category => category.dataValues),
            categoriesIncomeFromDb = categoryIncome.map(category => category.dataValues),        
            categoriesForChart = [],
            categoriesIncomeForChart = [],            
            budgetMonthsForChart = new Array(12).fill(0),
            AllExpensesForMonth = new Array(12).fill(0),
            AllIncomeForMonth = new Array(12).fill(0),            
            AllExpensesForDay = new Array(numberOfDays + 1).fill(0);
            AllIncomeForDay = new Array(numberOfDays + 1).fill(0);
            
            
        _.each(categoriesIncomeFromDb, (categoryIncome, index) => {
            categoryIncome.amount = 0;
            categoryIncome.amountActiveMonth = 0;
            
            _.each(categoryIncome.transactions, (transaction) => {
                categoryIncome.amount += parseFloat(transaction.dataValues.amount);
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month) {
                        categoryIncome.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                }  
                if (new Date(transaction.transaction_date).getFullYear() <= year &&
                new Date(transaction.transaction_date).getMonth() > month) { 
                        AllIncomeForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() <= month) { 
                        AllIncomeForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month) { 
                        AllIncomeForDay[transaction.transaction_date.getDate()] += transaction.dataValues.amount;
            }
            });

            categoriesIncomeForChart.push(categoryIncome);
        });
        _.each(categoriesFromDb, (category, index) => {
            category.amount = 0;
            category.amountActiveMonth = 0;
            category.amountActiveDay = 0;

            _.each(category.transactions, (transaction) => {
                category.amount += parseFloat(transaction.dataValues.amount);
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month) {
                        category.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                }  
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month &&
                    new Date(transaction.transaction_date).getDate() === day) {
                        category.amountActiveDay += parseFloat(transaction.dataValues.amount);
                }     
                if (new Date(transaction.transaction_date).getFullYear() <= year &&
                new Date(transaction.transaction_date).getMonth() > month) { 
                    AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() === month) { 
                        AllExpensesForDay[transaction.transaction_date.getDate()] += transaction.dataValues.amount;
                }
                if (new Date(transaction.transaction_date).getFullYear() === year &&
                    new Date(transaction.transaction_date).getMonth() <= month) { 
                        AllExpensesForMonth[transaction.transaction_date.getMonth()] += transaction.dataValues.amount;
                }
            });

            categoriesForChart.push(category);
        });

        _.each(budgetMonth, (budgetMonth) => {
            
            if(budgetMonth.dataValues.year <= year && 
                budgetMonth.dataValues.month > month) {
                    budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }
            if(budgetMonth.dataValues.year === year && 
            budgetMonth.dataValues.month <= month) {
                budgetMonthsForChart[budgetMonth.dataValues.month] = budgetMonth.dataValues.amount;
            }   
        });
        
            var budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues);
        
        return res.status(200).send({
            AllExpensesForMonth,
            AllIncomeForMonth,
            AllIncomeForDay,
            AllExpensesForDay,
            categoriesForChart,
            categoriesIncomeForChart,
            budgetMonthsForChart,
            budgetMonthsCategoryForChart,   
        })
    });
});
