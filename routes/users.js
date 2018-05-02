var express = require('express');
var router = express.Router();
var passport = require('../auth');
var User = require('../db/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nothing to do here, hehe!');
});

router.get('/register', (request, response) => {
  response.render('register', {title: 'Register Page'});
});

/* PASSPORT */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/'
  })
);

router.post('/register', (request, response, next) => {
  const { email, password } = request.body;

  User.create(email, password)
    .then(id => {
      request.login({ email, password }, error => {
        if (error) {
          return next(error);
        } else {
          return response.redirect('/loginsuccess');
        }
      });
    })
    .catch(error => {
      console.log(error);
      response.redirect('/failbot');
    });
});

module.exports = router;
