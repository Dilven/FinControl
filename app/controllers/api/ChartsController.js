var express = require('express'),
    router = express.Router(),
    db = require('../../models'),
    _ = require('lodash');

module.exports = function (app) {
    app.use('/api/charts', router);
};

router.get('/', function (req, res, next) {
    return db.Category.findAll({
        include: [
            { model: db.Transaction, as: 'transactions', required: true, where: { typeId: 1, userId: req.user.id } }
         ]
    })
        .then(results => {

            var categoriesFromDb = results.map(result => result.dataValues)

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
        })
    
    
});