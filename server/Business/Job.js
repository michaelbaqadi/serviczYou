var JobOffer = require('../../models/JobOffer.js');
var uuid = require('node-uuid');
var async = require('async');
var JobDB = require('../../models/Job.js');
var UserAlertDB = require('../../models/Alert.js');
var async = require('async');
var geolib = require('geolib');
var _ = require('underscore');

//Create Job for one specific user
exports.CreateJobOffer = function (req, res){
    var entry = new JobOffer({
        JobID				: req.body.JobID,
        ConfirmationNumber	: uuid.v4(),
        JobOfferOwnerID		: req.user.id,
        Price 				: req.body.Price,
        Comment 			: req.body.Comment
    });
    // if adding the entry fails then it will shouldup and error in the console.
    entry.save(function (err, entry) {
        res.redirect('/Business/ViewBusinessOffers');
    });
}

exports.GetMyJobOffers = function(req,res){
    var JobsAndOffers=[];
    async.waterfall([
        function(callback){
            JobOffer.find({JobOfferOwnerID : req.user.id}, function(err,offers){
                //res.render('Business/ViewJobOffers.jade');
                callback(err,offers);
            })
        }
        ,function(offers,method){
            var offersCount = 0;
            async.each(offers,function(offer,next){
               JobDB.find({_id:offer.JobID}, function(err,job){
                   var jobTemp = {};
                   jobTemp.OfferData = offer;
                   jobTemp.JobData = job[0];
                   JobsAndOffers.push(jobTemp);
                   next();
               })
            },function(){
                method(null,JobsAndOffers);
            })
        }
    ],function(err,JobsAndOffers){
        if(err) console.log("Error within with Job Offers in Server : " +  err);
        res.json(JobsAndOffers);
    })
}

exports.GetBusinessAlert = function(req,res){
    UserAlertDB.find({User : req.user.id}, function(err,data){
        res.json(data);
    })
}

exports.GetJobsMatchesAlertData = function(req,res){
        async.waterfall([
            function(next){
                // get my alert
                UserAlertDB.find({User:req.user.id},function(err,AlertResult){
                    next(null,AlertResult);
                })
            },
            function(AlertResult, next) {
                var Jobs =[];
                // You might get an error if you do not have created an alert so AlertResult[0].Words will not exist
                if(AlertResult.length != 0) // if Alert Result not equal to null then query by alert
                {
                    JobDB.find({title: new RegExp(AlertResult[0].Words, 'i')}, function (err, JobResults) {
                        if (err) console.log(err);

                        // If the job matches the requirements for alert then push it to the list
                        JobResults.forEach(function(job){

                            var jobDistanceInRange = geolib.isPointInCircle(
                                    {latitude: AlertResult[0].Lat, longitude: AlertResult[0].Lng},
                                    {latitude: job.latitude, longitude: job.longitude},
                                    AlertResult[0].MilesDistance*1610
                                );
                            if(jobDistanceInRange){
                                Jobs.push(job);
                            }

                        })
                        next(null,Jobs)
                    })
                }
                else{
                    next("There is an error",null)
                }
            },function(Jobs,callback){
                var JobsList = [];
                async.each(Jobs,function(job,next){
                    JobOffer.find({JobID : job._id, JobOfferOwnerID: req.user.id},function(err,results){
                        if(results.length==0){
                            JobsList.push(job);
                        }
                        next();
                    })
                },function(){
                    callback(null,JobsList);
                })
            }
        ], function(err,JobsList){
            if(err) console.log("Error Inside Get Jobs Match Alert Data in Server : " + err);
            res.json(JobsList);
        });
   }