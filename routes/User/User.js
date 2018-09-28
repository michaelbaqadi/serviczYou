// app/routes.js
var userServer = require ('../../server/User.js');
var jobServer = require ('../../server/Job.js');
var express = require('express');
var router = express.Router();
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', getUserInfo, function(req, res) {
    if(req.session.admin)
    res.render('User/index.jade', {
      user : req.user // get the user out of session and pass to template
    });
    else
      res.render('User/admin.html');
  });

  app.post('/', getUserInfo, function(req, res) {
    if(req.body.username == "teamservizyou" && req.body.password == "T4VvPD4YvK0Noc3pEocA") {
      req.session.admin = "teamservizyou";
    }
    res.redirect('/');
  });
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    if (req.user)
    {
      req.logout();
    }    res.render('User/login.jade', { message: req.flash('loginMessage') });
  });

  app.get('/test', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('User/Test.jade', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/signup', function(req, res) {
    if (req.user)
    {
      req.logout();
    }
    // render the page and pass in any flash data if it exists
    res.render('User/signup.jade', { message: req.flash('loginMessage') });
  });
  

  app.get('/forgotPassword', function(req, res) {
    res.render('User/ForgotPassword.jade', {
      user: req.user
    });
  });

  app.post('/forgotPassword', function(req, res, next) {
    userServer.forgotPassword(req, res, next, function(err, next){
    });
  });


  app.get('/reset/:token', function(req, res, next) {
    userServer.
      recoverPassword(req, res, next, function(err, next){
    });
  });

  app.post('/reset/:token', function(req, res, next) {
    userServer.recoverPasswordPOST(req, res, next, function(err, next){
      console.log("SERVER FORGOT PASSWORD");

      res.redirect('/forgotPassword');
    });
  });

  app.get('/activateAccount/:token', function(req, res, next) {
    console.log("ROUTE TOKEN: " + req.params.token);
    userServer.activateAccount(req, res, next, function(err, next){
    });
  });


  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('User/profile.jade', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.all('/home', isLoggedIn, function(req, res) {
    res.render('User/home.jade', {
      user : req.user // get the user out of session and pass to template
    });
  });

  app.all('/postJob', function(req, res) {
    res.render('User/postJob.jade', {
      user : req.user, // get the user out of session and pass to template
      jobID : (typeof req.body._id==='undefined')?"":req.body._id,
      title: (typeof req.body.title==='undefined')?"":req.body.title,
      description: (typeof req.body.description==='undefined')?"":req.body.description,
      category: (typeof req.body.category==='undefined')?"":req.body.category,
      email: (typeof req.body.email==='undefined')?"":req.body.email,
      price: (typeof req.body.price==='undefined')?0:parseInt(req.body.price),
      street: (typeof req.body.street==='undefined')?"":req.body.street,
      city: (typeof req.body.city==='undefined')?"":req.body.city,
      state: (typeof req.body.state==='undefined')?"":req.body.state,
      country: (typeof req.body.country==='undefined')?"":req.body.country,
      zipCode: (typeof req.body.zipCode==='undefined')?"":req.body.zipCode,
      startDate: (typeof req.body.startDate==='undefined')?"":req.body.startDate,
      endDate: (typeof req.body.endDate==='undefined')?"":req.body.endDate
    });

    //console.log("postjob: "+req.body.title);
  });


  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



  //FOR FACEBOOK

  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));


  //FOR GOOGLE
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));



  app.post('/usernameCheck',function (req, res){
    userServer.usernameCheck(req, res, function(err, result){
      res.json(result);
    });
  });

//router to check username exists
  app.post('/emailCheck',function (req, res){
    userServer.emailCheck(req, res, function(err, result){
      res.json(result);
    });
  });



  app.post('/updateProfile',function (req, res){
    var user_id = req.body.user_id;
    var address = req.body.address1;
    var city = req.body.city;
    var state = req.body.state;
    var zipcode = req.body.zipcode;
    var country = req.body.country;
    var phonenumber = req.body.phonenumber;
    var bio = req.body.bio;
    var email = req.body.email;
    var password = req.body.password;


      userServer.updateProfile( req, res, function(err, result){
        res.json(result);
      });
      res.redirect('/profile');
    //userServer.emailCheck(req, res, function(err, result){
    //  res.json(result);
    //});
  });

  app.get('/GetUserInfo',getUserInfo, function(req, res) {
    userServer.getUserInfo(req, res, function (err, result) {
      res.json(result);
    });
  });

  app.post('/email_form',function (req, res){
    userServer.email_form(req, res, function(err, result){
      res.json(result);
    });
  });


  // =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

  // locally --------------------------------
  app.get('/connect/local', function(req, res) {
    res.render('connect-local.jade', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
      passport.authorize('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback',
      passport.authorize('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));


  // google ---------------------------------

  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback',
      passport.authorize('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));



  // =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // google ---------------------------------
  app.get('/unlink/google', function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });



};

// route middleware to make sure
function getUserInfo(req, res, done) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return done();
  else
    return done(null, false);
  // if they aren't redirect them to the home page
}



// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    if(req.session.postJob) {
      //console.log("Testing: " + JSON.stringify(req.session.postJob));
      //console.log("user: "+req.user.id);
      jobServer.CreateUserJobSession(req.user.id, req.session.postJob);
      req.session.postJob = null;
    }
    else
    if ((typeof req.user.local.businessname == 'undefined'))
    {
      return next();
    }
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}
