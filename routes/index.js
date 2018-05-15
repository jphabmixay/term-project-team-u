var express = require( 'express' );
var app=express();
var router=express.Router();
const passport = require('../authentication/passport');
var db=require('../database/db');
//var bcrypt = require('bcrypt');
const Users = require('../models/users')
const Avatars = require('../models/avatars')
const Games = require('../models/games')
const Messages = require('../models/messages')
const Players = require('../models/players')
CryptoJS=require('crypto-js');
var SHA256 = require("crypto-js/sha256");


router.get('/', function(req, res, next) {

  if(req.isAuthenticated()){
       res.redirect('lobby');
  } else {
       res.render('index', { title: 'UNO'});
  }
});


router.post('/register', (req, res, next) => {
    Users.emailNotUsed(req.body.email).then( one => {
			user=req.body;
			hash=SHA256(user.password)
			user.encrypted_password=user.password
	  		console.log(user.encrypted_password)
    		Users.createFromRegister(user)
    		.then(() => {
  				console.log(user);	
				res.redirect('success');
    		})
    		.catch(error => {
 		 		console.log(error);
    		});
	}).catch( error => {
	    res.render('signup', { error: 'email is already used'});
	});

});

router.get('/register', function(req, res, next) {
	res.render('signup', { title: 'Sign Up'});
});

router.get('/success', function(req, res, next) {
	res.render('login',{message:"Successfully Signed Up!"});
});

router.post(
  '/login',
  passport.authenticate( 'local', { session: true,
        successRedirect : '/lobby', // redirect to the lobby
        failureRedirect : '/login', // redirect back to the index if error
        failureFlash : true // allow flash messages } ),
  })
);


router.get('/login', function(req, res, next) {
	if (req.isAuthenticated()){
	res.render('lobby', { auth_stat: 'Authenticated', email: req.user.email });
	} else {
	res.render('login', { error: req.flash('error') });
	}
});

router.get('/lobby', function(req, res, next) {
	if (req.isAuthenticated()){
		Games.listJoinables().then( games=> {
			Messages.listLobbyMsg().then( msgs => {
			res.render('lobby', { auth_stat: 'Authenticated', email: req.user.email, games: games, user: req.user, messages:msgs});
			});
		}).catch( error => {
			games={};
			console.log(error);
			res.render('lobby', { auth_stat: 'Authenticated', email: req.user.email, games: games, user: req.user});
		});
	} else {
		res.redirect('login');
	}

});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;
