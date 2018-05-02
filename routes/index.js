var express = require('express');
var router = express.Router();
var requireAuthentication = require('../auth/requireAuthentication');

/* GET home/lobby page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginsuccess', requireAuthentication, (request, response) => {
  const { user } = request;
});

module.exports = router;
