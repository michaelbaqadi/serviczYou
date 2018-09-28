/**
 * Created by Larry Huynh on 1/16/16.
 */
var express = require('express');
var jobServer = require('../../server/Job.js');

module.exports = function(app, passport) {
    //Get job for view more
    app.get('/Job/GetJobFromID/:id', function(req, res) {
        //console.log("getjobfromid: "+req.params.id);
        jobServer.GetJobFromID(req.params.id, function (err, result) {
            res.json(result);
        });
    });

    //Get List of All Job from every User
    app.get('/Job/GetAllJobs', function(req, res) {
        jobServer.GetAllJobHistory(function (err, result) {
            res.json(result);
        });
    });

    //Get List of All Job from every User
    app.post('/Job/PostJobLogin', function(req, res) {
        //console.log("here: " + JSON.stringify(req.body));
        req.session.postJob = req.body;
        //req.session.postJob = {title: req.body.title, description: req.body.description};
        res.redirect('/login');
    });

    //Get list of jobs from user
    app.get('/Job/GetJobHistory', function(req, res) {
        jobServer.GetAllUserJobHistory(req.user.id, function (err, result) {
            res.json(result);
        });
    });

    //Get Count of user job
    app.get('/Job/GetUserJobCount', function(req, res) {
        jobServer.GetUserJobCount(function (err, result) {
            res.json(result);
        });
    });

    //Get Count of user job
    app.get('/Job/GetJobOffers/:id', function(req, res) {
        jobServer.GetJobOffers(req.params.id, function (err, result) {
            res.json(result);
        });
    });

    //create user job
    app.post('/Job/CreateUserJob', function(req, res) {
        //console.log(req.body);
        jobServer.CreateUserJob(req, function (err, result) {
            res.send({
                retStatus : 'Success',
                redirectTo: '/home',
                msg : 'Just go there please' // this should help
            });
        });
    });

    //update user job
    app.post('/Job/UpdateUserJob', function(req, res) {
        console.log("UPDATE USER JOB");
        jobServer.UpdateUserJob(req, function (err, result) {
            res.send({
                retStatus : 'Success',
                redirectTo: '/home',
                msg : 'Just go there please' // this should help
            });
        });
    });
/*
    //Get list of jobs from user
    app.post('/Job/indexPostJob', function(req, res) {
        console.log("USER ID : " + req.body.title);
        console.log("ADDRESS : " + req.body.category);
        console.log("CITY : " + req.body.startDate);
        console.log("STATE : " + req.body.endDate);

        var myJob = {
            'title': req.body.title,
            'category': req.body.category,
            'city': req.body.city,
            'startDate': req.body.startDate,
            'endDate': req.body.endDate
        }
        console.log("myJob: " + JSON.stringify(myJob));
        res.redirect('/postJob');
    });
*/
    //Delete user job
    app.post('/Job/DeleteUserJob/:id', function(req, res) {
        jobServer.DeleteJobID(req.user.id, req.params.id, function (err, result) {
            //return res.redirect('/home');
            /*res.end();
            res.render('User/home.jade', {
                user : req.user // get the user out of session and pass to template
            });*/
            res.send({
                retStatus : 'Success',
                redirectTo: '/home',
                msg : 'Just go there please' // this should help
            });
        });
    });

    //Edit user job
    app.get('/Job/EditUserJob/:id', function(req, res) {
        console.log("edit job not sever");
        jobServer.GetOneJobFromJobID(req.user.id, req.params.id, function (err, result) {
            res.json(result);
            /*res.send({
                retStatus : 'Success',
                redirectTo: '/postJob',
                msg : 'Just go there please' // this should help
            });
            res.json({title: 'TESTING'});*/
        });
    });

    //View more about the job in detail
    app.get('/Job/ViewMore/:id', function(req, res) {
        res.render("User/JobDetail.jade", {
            user: req.user
        });
    });

    //Get List of All Job Categories
    app.get('/Job/GetAllCategory', function(req, res) {
        jobServer.GetAllCategory(function (err, result) {
            //console.log(result);
            res.json(result);
        });
    });

    // default param for id
    app.param('id', function(req, res, next, val) {
        req.params.id = val;
        next();
    });
}

