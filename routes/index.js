const express = require('express');
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

/* GET home/lobby page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lobby', requireAuthentication, (request, response) => {
  const { user } = request;
  response.render('lobby', {user, title: 'Uno Lobby!'});
});

module.exports = router;
