var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    db = require('../../models'),
    _ = require('lodash');
    

module.exports = function (app) {
    app.use('/api/charts', router);
};

router.get('/dashboard', function (req, res, next) {
    const categories = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: { typeId: 1, userId: req.user.id } }
         ]
    });
    
    return Promise.join(categories, function (category) {
            var categoriesFromDb = category.map(category => category.dataValues)
            
                        var categoriesForChart = [];            
            
                        _.each(categoriesFromDb, (category) => {
                            category.amount = 0;
                            _.each(category.transactions, (transaction) => {
                                category.amount += parseFloat(transaction.dataValues.amount);    
                            })
                            categoriesForChart.push(category);
                        })
                    
                        res.status(200).send({
                            categoriesForChart
                        })
        });
});

router.get('/analysis', function (req, res, next) {
    var date = new Date(),
    month = date.getMonth();

    const categories = db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: { typeId: 1, userId: req.user.id } }
         ]
    });



    const budgetedMonths = db.Budget.findAll({where:{userId: req.user.id}});
    const budgetedMonthsCategory = db.BudgetCategory.findAll({where:{userId: req.user.id, month:month}});
    
    return Promise.join(categories,budgetedMonths, budgetedMonthsCategory, function (category, budgetMonth, budgetMonthCategory) {
       
        var categoriesFromDb = category.map(category => category.dataValues)
            
        var categoriesForChart = [];            

        var categoriesForActiveMonth = [];

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

        var budgetMonthsForChart = budgetMonth.map(budgetMonth => budgetMonth.dataValues),
            budgetMonthsCategoryForChart = budgetMonthCategory.map(budgetMonthCategory => budgetMonthCategory.dataValues);
        
        return res.status(200).send({
            categoriesForChart,
            budgetMonthsForChart,
            budgetMonthsCategoryForChart,
        })
    });
});
