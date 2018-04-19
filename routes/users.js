var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nothing to do here, hehe!');
});

router.get('/login', (request, response) => {
  response.render('login', {title: 'Login Page'});
});

router.get('/register', (request, response) => {
  response.render('register', {title: 'Register Page'});
});

module.exports = router;
