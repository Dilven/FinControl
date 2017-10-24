var express = require('express'),
router = express.Router(),
db = require('../models');

module.exports = function (app) {
app.use('/saveSucces', router);
};

router.get('/', function (req, res, next) {
db.Article.findAll().then(function (articles) {
  res.render('saveSucces', {
    title: 'Pomyślnie zarejestrowano',
    articles: articles
    });
  });
});
