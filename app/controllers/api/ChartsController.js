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
            budgetMonthsForChart = budgetMonth.map(budgetMonth => budgetMonth.dataValues);
        
        _.each(categoriesFromDb, (category) => {
            category.amount = 0;
            category.amountActiveMonth = 0;
                        
            _.each(category.transactions, (transaction) => {
                category.amount += parseFloat(transaction.dataValues.amount);  
                
                if (new Date(transaction.transaction_date).getFullYear() === new Date().getFullYear() &&
                    new Date(transaction.transaction_date).getMonth() === new Date().getMonth()) {
                    category.amountActiveMonth += parseFloat(transaction.dataValues.amount);
                }      
            })
            categoriesForChart.push(category);
        })
    
        res.status(200).send({
            categoriesForChart,
            budgetMonthsForChart
        })
    });
});

router.get('/analysis', function (req, res, next) {
    var date = new Date(),
        month = date.getMonth();

    var dateToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1);

    const categoriesToday = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: {
                typeId: 1,
                userId: req.user.id ,
                transaction_date: dateToday,
                } 
            }
        ]
    });

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
    
    return Promise.join(categoriesToday, categories, budgetedMonths, budgetedMonthsCategory, function (categoryToday, category, budgetMonth, budgetMonthCategory) {
       
        var categoriesFromDb = category.map(category => category.dataValues),
            categoriesFromDbToday = categoryToday.map(categoryToday => categoryToday.dataValues),  
            categoriesForChart = [];
            
        _.each(categoriesFromDb, (category) => {
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
            })
            categoriesForChart.push(category);
        })

        var budgetMonthsForChart = budgetMonth.map(budgetMonth => budgetMonth.dataValues),
            budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues);
        
        return res.status(200).send({
            categoriesForChart,
            budgetMonthsForChart,
            budgetMonthsCategoryForChart,
            
        })
    });
});
