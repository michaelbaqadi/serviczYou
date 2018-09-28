/**
 * Created by michaelbaqadi on 12/18/15.
 */

/**
 * Created by michael.baqadi on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var companyProfileInfoDB = require('../node_modules/companyProfileInfoSchema.js');
var session	= require('express-session');
var jobDB = require('../models/Job.js');

router.post('/CreateCompanyAccount',function(req,res){
    /*companyProfileInfoDB.create({
      Name : req.body.Name,
      Address : req.body.Address,
      WebURL : req.body.WebURL,
      PhoneNumber : req.body.PhoneNumber,
      Email : req.body.Email,
      Categories : req.body.Categories || 'No Category',
      Description : req.body.Description,
      //UserAccountCreator : req.session.username
  })
  */
    companyProfileInfoDB.update({username: req.session.username},
        { $set: {   Name: req.body.Name,
                    Address : req.body.Address,
                    WebURL : req.body.WebURL,
                    PhoneNumber : req.body.PhoneNumber,
                    Email : req.body.Email,
                    Categories : req.body.Categories || 'No Category',
                    Description : req.body.Description
                }}, function (err, docs) {
        if (err)
            console.log("error");
        else
            console.log("no error");
    });
});

router.post('/GetCompanyProfileInfo',function(req,res){
    companyProfileInfoDB.find({
            Name : req.body.ID
        },
        function(err, ProfileInfo){
            if(err){
                err.send(err);
            }
            res.json(ProfileInfo);
        }
    );
})

router.get('/getjobsmatchescompanyspecifications',function(req,res){
    jobDB.find(function(err,jobs){
        if(err){
            err.send(err);
        }
        res.json(jobs);
    });
})

module.exports = router;
