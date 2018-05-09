const express = require('express');
const router = express.Router();
const passport = require('../auth');
const User = require('../db/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Nothing to do here, hehe!');
});

/* PASSPORT */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/register', (request, response) => {
  response.render('register');
});

router.post('/register', (request, response, next) => {
  const { email, password } = request.body;

  User.create(email, password)
    .then(id => {
      request.login({ email, password }, error => {
        if (error) {
          return next(error);
        } else {
          return response.redirect('/lobby');
        }
      });
    })
    .catch(error => {
      console.log(error);
      response.redirect('/failbot');
    });
});

module.exports = router;
