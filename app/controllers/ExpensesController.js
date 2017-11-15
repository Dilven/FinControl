var express = require('express'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    app.use('/expenses', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    return Transaction.findAll({ where: { typeId: 1, userId: req.session.passport.user } }).then(data => {
        var expenses = [];
        data.forEach(el => {
            expenses.push(el.dataValues)
        })
        
        res.render('expenses', {
            title: 'Panel glowny',
            expenses: expenses,
            navigation: [
                { name: 'Dzis'},
                { name: 'W tygodniu'},
                { name: 'W miesiącu'},
            ],
            
            
            
        });
    })
    
    
});

router.post('/add', function (req, res, next) {
    
    var formData = req.body;
   
    formData.userId = req.session.passport.user;
    if(formData.typeId =='Wydatek') formData.typeId = 1;
    else formData.typeId = 2;
    

    delete formData.transaction_date
    
    return Transaction.create(formData)
        .then((data) => {
            //console.log(data);
            res.status(200).send({
                message: 'Dodano wydatek'
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                message: 'Błąd dodawania transakcji!'
            })
        })
});