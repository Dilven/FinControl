var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    authMiddleware = require('../middlewares/authMiddleware')
    db = require('../models'),

module.exports = function (app) {
    app.use('/actions', authMiddleware, router);
};

router.get('/', function (req, res, next) {
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
    const monthNow = _.find(months, ['value', parseInt(monthNowNumber)])
    return db.Category.findAll()
        .then(categories => {

            res.render('actions', {
                title: 'Akcje',
                monthNow,
                months,
                timeNavVisibility: false
            });
        })
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
    console.log('dupa');
    console.log(req.body.budgetMonthForCategory);
    const month = parseInt(req.body.budgetMonthForCategory);
    
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

