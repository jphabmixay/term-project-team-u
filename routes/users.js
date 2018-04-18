var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nothing to do here, hehe!');
});

router.get('/login', (request, response) => {
  response.send('this will be the login page!');
});

router.get('/register', (request, response) => {
  response.send('this will be the register page!');
});

module.exports = router;
