var express = require('express'),
    router = express.Router(),
    _ = require('lodash');

module.exports = function (app) {
    app.use('/api/charts', router);
};

router.get('/', function (req, res, next) {
    var lastExpenses = [
        { name: 'Piwo', amount: '2.99', date: new Date('2017', '10', '30'), category: 'Alkohol' },
        { name: 'Zakupy na obiad', amount: '30.99', date: new Date('2017', '10', '27'), category: 'Gospodarstwo domowe' },
        { name: 'Kino', amount: '20.99', date: new Date('2017', '10', '25'), category: 'Rozrywka'},
        { name: 'Mecz Arsenal vs Chelsea', amount: '100', date: new Date('2017', '10', '28'), category: 'Rozrywka'}
    ];
    
    var categoriesForChart = [];
    
    _.each(lastExpenses, expense => {
        var cat = _.find(categoriesForChart, ['name', expense.category])
        if (typeof cat !== 'undefined') {
            cat.amount += parseFloat(expense.amount)
        } else {
            categoriesForChart.push({
                name: expense.category,
                amount: parseFloat(expense.amount)
            })
        }
    })

    res.status(200).send({
        categoriesForChart
    })
});