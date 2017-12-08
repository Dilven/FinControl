var express = require('express'),
    Promise = require('bluebird'),
    router = express.Router(),
    authMiddleware = require('../middlewares/authMiddleware'),
    db = require('../models'),
    Transaction = db.Transaction;

module.exports = function (app) {
    app.use('/categories', authMiddleware, router);
};

router.get('/', function (req, res, next) {
    return db.Category.findAll()
    .then(results => {
        res.status(200).send(results);
    })
});
