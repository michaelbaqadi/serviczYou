/**
 * Created by michael.baqadi on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var summaryDB = require('../node_modules/summarySchema.js');
var reviewsDB = require('../node_modules/reviewSchema.js');
var jobDB = require('../models/Job.js');
var userProfileDB = require('../node_modules/userProfileSchema.js');

function getSummaryForUser(res){
    summaryDB.find(function(err) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
};

router.post('/createprofilesummary',function(req,res){
    summaryDB.remove({ username : 'testuser' }, function (err) {
        if(!err){
            summaryDB.create({
                username : 'testuser',
                summary : req.body.summary
            });
        }
    });
});




router.get('/usersummary', function (req, res) {
        summaryDB.find({ username: 'testuser'}, function (err, docs) {
            if(err){
                res.send(err);
            }
            else {
                res.json(docs);
            }
        });
});


router.post('/review',function(req,res){
    reviewsDB .create({
        customerUsername : 'testuser',
        workerUsername : 'testuser',
        Review : req.body.Review,
        Stars : req.body.Stars
    });
});

router.get('/accountreviews', function (req, res) {
    reviewsDB.find({ customerUsername: 'testuser'}, function (err, docs) {
        if(err){
            res.send(err);
        }
        else {
            res.json(docs);
        }
    });
});

router.post('/newjob', function (req, res) {
    console.log(req.body);
    jobDB.create({
        jobOwner : req.session.username,
        jobAssignee: req.body.jobAssignee,
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        category: req.body.category.name,
        Labels  : req.body.label,
        street : req.body.street,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        zipCode : req.body.zipCode,
        online : req.body.online
    }, function(err) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
    });

});

router.post('/curactivejobs', function(req,res){
    jobDB.find({ activeJob : req.body.curactivejobs}, function (err, docs) {
        if(err){
            res.send(err);
        }
        else {
            res.json(docs);
        }
    });
});

router.post('/updateLabel', function(req,res){
    userProfileDB.update({username: "abx1234"}, { $set: {Labels: req.body.label}}, function (err, docs) {
        if (err)
            console.log("error");
        else
            console.log("no error");
    });
});

module.exports = router;