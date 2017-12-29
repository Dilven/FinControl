var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    _ = require('lodash'),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Budget = db.Budget,
    Category = db.Category;
    BudgetCategory = db.BudgetCategory;

module.exports = function (app) {
    app.use('/actions', authMiddleware, router);
};

router.get('/', function (req, res, next) {

    var date = new Date(),
        month = date.getMonth();
        
    const months = [
        {name: 'styczeń', value: 0},
        {name: 'luty', value: 1},
        {name: 'marzec', value: 2},
        {name: 'kwiecień', value: 3},
        {name: 'maj', value: 4},
        {name: 'czerwiec', value: 5},
        {name: 'lipiec', value: 6},
        {name: 'sierpień', value: 7},
        {name: 'wrzesień', value: 8},
        {name: 'październik', value: 9},
        {name: 'listopad', value: 10},
        {name: 'grudzień', value: 11}
    ];
    
    const monthNowNumber = new Date().getMonth();
    const yearNow = new Date().getFullYear();
    const monthNow = _.find(months, ['value', parseInt(monthNowNumber)]);
    const monthlyBudget = Budget.findOne({where:{userId: req.user.id, month: monthNowNumber}});
    const categoryAll = Category.findAll();
    const sumBudgetCategories = BudgetCategory.sum('amount', { where: {userId: req.user.id, month: month }});
    const findAllBudgetCategories = BudgetCategory.findAll({ where: {userId: req.session.passport.user }});
    
    return Promise.join(monthlyBudget, categoryAll,sumBudgetCategories,findAllBudgetCategories, function (budget, categories, budgetedAmount, budgetCategoriesFromDb ) {
       
        var budgetAmount = 0,
            budgetCategories = [];
            years = [];

        if(budget !== null) {
            budgetAmount = budget.amount;
        } 

        budgetCategoriesFromDb.forEach(el => {
            budgetCategories.push(el.dataValues)
            years.push(el.dataValues.year)
        });
    
        res.render('actions', {
            title: 'Akcje',
            budget: budgetAmount ? parseFloat(budgetAmount).toFixed(2) : 0,
            budgetedAmount: budgetedAmount ? parseFloat(budgetedAmount).toFixed(2) : 0,
            budgetCategories: budgetCategories,
            monthNow,
            months,
            years : _.union(years),
            yearNow,
            categories,
            timeNavVisibility: false
        });
        
    });
});

router.post('/budget', function (req, res, next) {
    var data = req.body;
    const monthNow = new Date().getMonth();
    const month = parseInt(req.body.budgetMonth);
    
    let year = parseInt(new Date().getFullYear());
    if (monthNow > month) {
        year += 1;
    }
    const amount = req.body.amount;
    const userId = req.user.id;

    return db.Budget.findOrCreate({where: {userId: req.user.id, month: month, year: year}})
        .then(budget => {
            return db.Budget.update(
                { amount: amount },
                { where: { id: budget[0].dataValues.id } }
              )
              .then(() => {
                res.status(200).send({message: 'ok'});
              })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: 'not ok', error: err})
        })
});

router.post('/budgetcategories', function (req, res, next) {
    var data = req.body;
    const monthNow = new Date().getMonth();
    
    const month = parseInt(req.body.budgetMonthForCategory);
    const categoryId = parseInt(req.body.category);
    
    let year = parseInt(new Date().getFullYear());

    if (monthNow > month) {
        year += 1;
    }

    const amount = req.body.amount,
          userId = req.user.id;

    return db.BudgetCategory.findOrCreate({where: {userId: req.user.id, month: month, year: year, categoryId: categoryId}})
        .then(budget => {
            return db.BudgetCategory.update(
                { amount: amount },
                { where: { id: budget[0].dataValues.id } }
              )
              .then(() => {  
                res.status(200).send({message: 'ok'});
              })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: 'not ok', error: err})
        })
});

