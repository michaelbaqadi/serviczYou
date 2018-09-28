/**
 * Created by michael.baqadi on 1/16/16.
 */
var express = require('express');
var JobDB = require("../../models/Job.js")
var JobOffer = require("../../models/JobOffer.js")
var JobOfferDB =  require('../../server/Business/Job.js');

module.exports = function(app, passport) {
    // default param for id
    app.param('id', function(req, res, next, val) {
        req.params.id = val;
        next();
    });
    app.get('/Business/TEST', function(req, res) {
        //res.render('User/Index.jade');
        res.render('Business/home.jade');
    });

    app.get('/Business/GetJobMatchesCompany',isBusinessLogIn, function(req, res) {
        JobDB.find(function(err,jobs){
            if(err){
                err.send(err);
            }
            res.json(jobs);
        })
    });

    app.post('/Business/ViewJob',isBusinessLogIn,function(req,res){
        retStatus = 'Success';
        res.send({
            retStatus : retStatus,
            redirectTo: '/Business/CreateJobOffer?id='+req.body._id,
            msg : 'Just go there please',
            jobID : req.body._id
        });
    })


    app.get('/Business/CreateJobOffer', isBusinessLogIn, function (req, res, next) {
        res.render('Business/CreateJobOffer.jade', {
            user: req.user
        });
    });

    app.get('/Business/JobInfoForOffer/:id', function(req,res){
        JobDB.find({_id : req.params.id},
            function(err, jobs){
                if(err){
                    err.send(err);
                }
                res.json(jobs);
            }
        );
    });

    app.post('/Business/CreateNewJobOffer',isBusinessLogIn,function(req,res){
        JobOfferDB.CreateJobOffer(req,res);
    });

    app.get('/Business/ViewBusinessOffers', isBusinessLogIn, function (req, res, next) {
        res.render('Business/ViewJobOffers.jade', {
            user: req.user
        });
    });

    app.get('/Business/OffersForMyBusiness',isBusinessLogIn,function(req,res){
        JobOfferDB.GetMyJobOffers(req,res);
    });
    app.get('/Business/GetJobsMatchesMyBusinessAlert',isBusinessLogIn,function(req,res){
        JobOfferDB.GetJobsMatchesAlertData(req,res);
    });

    app.get("/Business/GetCurrentBusinessAlert",isBusinessLogIn,function(req,res){
        JobOfferDB.GetBusinessAlert(req,res);
    })


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

