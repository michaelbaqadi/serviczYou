var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.server.controller.js');
var findUserController = require ('../controllers/findUser.server.controller.js');
var session = require('express-session');

var sess;
//router to check username exists
router.post('/usernameCheck',function (req, res){
  loginController.usernameCheck(req, res, function(err, result){
      res.json(result);
  });
});

//router to check username exists
router.post('/emailCheck',function (req, res){
  loginController.emailCheck(req, res, function(err, result){
      res.json(result);
  });
});

module.exports = router;


