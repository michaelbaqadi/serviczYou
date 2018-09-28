var express = require('express');
var router = express.Router();
//var userProfileController = require('../controllers/userProfile.server.controller.js');
//var paymentController = require('../controllers/payment.server.controller.js');
//var twilioController = require('../controllers/twilio.server.controller.js');
//var jobFormController = require('../controllers/singleJobForm.server.controller.js');
//var auth = require ('../controllers/auth.server.controller.js');
//var findUserController = require ('../controllers/findUser.server.controller.js');
//var session = require('express-session');

router.get('/', function(req, res){
  res.render('index.jade');
});

/*
router.get('/createNewJob', function (req, res, next) {
  res.render('account-Profile.jade');
});

// When the user submit from login.html, it will routed in here
router.post('/createuserprofileorlogin', function(req, res) {
  if(req.body.group1 == 1)
  {
    findUserController.checkUser(req.body.username, req.body.psw, req.body.userRole, function(err, result)
    {
      if(result == true)
      {
        req.session.username = req.body.username;
        //session is created
        if(req.session.username && req.body.userRole == 0)
        {
          res.render('home-Customer.jade');
        }
        else if((req.session.username && req.body.userRole == 1))
        {
          res.render('ViewJobsForCurrentCompany.jade',{username : req.session.username});
        }
      }
      else if(result == false)
      {
        console.log(req.body.group1);
        res.redirect('/');
      }
    });
  }
    
  if(req.body.group1 == 0)
  {
    console.log("entering create: " + req.body.userRole);
    if(req.body.userRole == 0)
      userProfileController.createCustomerProfile(req,res);
    else
      userProfileController.createBusinessProfile(req, res);
    res.redirect('/');
  }
});

router.get('/payment', function(req, res, next) {
  res.render('payment', { title: 'Payment' });
});

router.post('/cardpayment', function(req, res, next) {
  paymentController.createPayment(req,res); 
  res.render('cardpayment', { title: 'cardpayment' });
});

router.get('/twilio', function(req, res, next) {
  res.render('twilio', { title: 'twilio' });
});

router.post('/twilioText', function(req, res, next) {
  twilioController.createTwilio(req,res); 
  res.render('twilioText', { title: 'twilioText' });
});

router.post('/singleJobForm',function (req, res){
  console.log("Title value is : " + req.body.jobFormTitle);
  jobFormController.createSingleJobForm(req,res);
    res.render('createToDoListForm');
});

router.get('/testqa',function (req, res){
  res.render('questionsanswers');
});

router.get('/jobOfferList',function (req, res){
  res.render('job-offer-list');
});

router.get('/GetGeoLocation',function (req, res){
  if(geolocation){
    console.log("geolocation exists");
    geolocation.getCurrentPosition(function (err, position) {
      if (err) throw err
      console.log(position);
    });
  }
  else{
    console.log("Sorry, browser does not support geolocation!");
  }
});
*/
module.exports = router;
