// app/routes.js
var express = require('express');
var businessServer = require ('../../server/Business/Business.js');
var businessUserServer = require ('../../server/Business/User.js');

module.exports = function(app, passport) {
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/Business/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('Business/Login.jade', {message: req.flash('loginMessage')});
  });

  // process the login form
  app.post('/Business/login', passport.authenticate('business-local-login', {
    //successRedirect: '/Business/home', // redirect to the secure profile section
    successRedirect: '/Business/home', // redirect to the secure profile section
    failureRedirect: '/Business/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form

  // process the signup form
  app.post('/Business/signup', passport.authenticate('business-local-signup', {

    successRedirect: '/Business/login', // redirect to the secure profile section
    failureRedirect: '/Business/signup', // redirect back to the signup page if there is an error
    failureFlash: true,
    // allow flash messages
  }));

  app.get('/Business/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('Business/SignUp.jade', {message: req.flash('loginMessage')});
  });

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)

  app.get('/Business/home', isBusinessLogIn, function (req, res) {
    res.render('Business/Home.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/Business/ViewJobOffers', isBusinessLogIn, function (req, res) {
    res.render('Business/ViewJobOffers.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });


  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/Business/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Check for business name duplication
  app.post('/Business/businessnameCheck',function (req, res){
    console.log("CHECKKING BUSINESS");

    businessUserServer.businessnameCheck(req, res, function(err, result){
      res.json(result);
    });

  });
  // Check for Business Email Duplication
  app.post('/Business/emailCheck',function (req, res){
    businessUserServer.emailCheck(req, res, function(err, result){
      res.json(result);
    });
  });

  app.get('/Business/reset/:token', function(req, res, next) {
    businessUserServer.recoverPassword(req, res, next, function(err, next){
    });
  });

  app.post('/Business/reset/:token', function(req, res, next) {
    businessUserServer.recoverPasswordPOST(req, res, next, function(err, next){
      console.log("SERVER FORGOT PASSWORD");

      res.redirect('/forgotPassword');
    });
  });

  app.get('/Business/activateAccount/:token', function(req, res, next) {
    businessUserServer.activateAccount(req, res, next, function(err, next){
    });
  });

  app.get('/Business/EditBusinessProfile/:id' , isBusinessLogIn,  function(req, res) {
      res.render('Business/EditBusinessProfile', {
        user: req.user
      });
  });

  app.post('/Business/CreateEditBusinessAddress', function (req, res) {
        businessServer.CreateEditBusinessAddress(req,res, function(req,res){
          res.render('Business/CompanyProfile.jade');
        });
  });

  app.get('/Business/EditProfile', isBusinessLogIn, function (req, res) {
    res.render('Business/EditBusinessProfile.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/Business/CreateAddress', isBusinessLogIn, function (req, res) {
    res.render('Business/CreateAddress.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/Business/CreateAddress', isBusinessLogIn, function (req, res) {
    res.render('Business/CreateAddress.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // Do not use this one, deprecated
  app.get('/Business/ViewBusinessProfile', isBusinessLogIn, function(req,res){
    res.render('Business/CompanyProfile.jade', {
      user: req.user
    });
  })

// default param for id
  app.param('id', function(req, res, next, val) {
    req.params.id = val;
    next();
  });

  app.get('/Business/ViewBusinessProfile/:id', isBusinessLogInNoRedirect, function(req,res){
    res.render('Business/CompanyProfile.jade', {
      user: req.user
    });

  })

  app.post('/Business/AddCategories', function(req,res){
    businessServer.InsertCompanyCategories(req,res);
  })

  app.post('/Business/CreateUpdateBusinessProfileInfo',isBusinessLogIn, function(req,res){
    businessServer.CreateUpdateBusinessProfileInfo(req,res);
  })

  app.get("/Business/GetBusinessProfileInfo",function(req,res){
    businessServer.GetBusinessProfileInfo(req,res,function(err,BusinessProfileInfo){
      res.json(BusinessProfileInfo);
    });
  })

  app.get("/Business/GetBusinessProfileInfo/:id",isBusinessLogInNoRedirect ,function(req,res){
    businessServer.GetBusinessProfileInfoforCustomer(req,res,function(err,BusinessProfileInfo){
      res.json(BusinessProfileInfo);
    });
  })
  app.post("/Business/CreateAlert",isBusinessLogIn,function(req,res){
    businessServer.CreateOneAlert(req,res);
  })

  app.get("/Business/GetBusinessAccountInfo",isBusinessLogIn,function(req,res){
    businessServer.GetBusinessAccountInfo(req,res);
  })
}

// route middleware to make sure
function isBusinessLogIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    if (!(typeof req.user.local.businessname == 'undefined'))
    {
      return next();
    }
  }
  // if they aren't redirect them to the home page
  res.redirect('/Business/login');
};

function isBusinessLogInNoRedirect(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  {
    if (!(typeof req.user.local.businessname == 'undefined'))
    {
      return next();
    }
  }
  return next();
  // if they aren't redirect them to the home page
};
