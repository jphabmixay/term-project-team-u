var passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;
const bcrypt = require('bcrypt');
db=require('../database/db');
CryptoJS=require('crypto-js');
var SHA256 = require("crypto-js/sha256");
const Users = require('../models/users');

var localStrategy = new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
	  passReqToCallback : true
   },
    function(req, username, password, done) {
      Users.findByEmail(username).then( user => {
	  console.log(user);
	  hash=SHA256(password);
	  encrypted=password;
      if ( encrypted !== user.encrypted_password) {
        return done( null, false, { message: 'Wrong password' } );
      };
        done( null, user );
      })
      .catch( error => {
          console.log(error);
          return done( null, false, { message: 'Invalid user' } );
	  });
  });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use( 'local', localStrategy );

module.exports=passport
