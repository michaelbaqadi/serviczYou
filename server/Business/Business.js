/**
 * Created by michael.baqadi on 2/5/16.
 */
var BusinessProfileDB = require('../../models/BusinessProfile.js');
var BusinessCategories = require('../../models/Categories.js');
var AlertDB  = require('../../models/Alert.js');
var geocoder = require('geocoder');
var async = require('async');
var AccountInfoDB = require('../../models/Business.js')



exports.CreateEditBusinessAddress = function (req,res) {
    BusinessProfileDB.create({
        UserId : req.user.id,
        MainAddress : {
            Street : req.body.Street,
            City : req.body.City,
            ZipCode : req.body.ZipCode,
            State : req.body.State,
            Country : req.body.Country,
            SuiteNumber : req.body.SuiteNumber

        }
    }, function(err){
        res.redirect('/Business/ViewBusinessProfile');
    })
}

exports.InsertCompanyCategories = function(req,res){
    var entry = new BusinessCategories({
       Categories : req.body.multipleSelect
    });

    entry.save(function(err){
        if(err) console.log('Error: ' + err);
    })

}

exports.CreateUpdateBusinessProfileInfo = function(req,res){
    BusinessProfileDB.create({
        UserId : req.user.id,
        MainAddress : {
            Street : req.body.Street,
            City : req.body.City,
            ZipCode : req.body.ZipCode,
            State : req.body.State,
            Country : req.body.Country,
            SuiteNumber : req.body.SuiteNumber
        },
        WebURL : req.body.WebURL,
        PhoneNumber : req.body.PhoneNumber,
        ContactEmail : req.body.ContactEmail,
        AdditionalInfo : req.body.AdditionalInfo,
        Categories : req.body.Categories
    }, function(err){
        res.redirect('/Business/ViewBusinessProfile/'+req.user.id);
    })
}

exports.GetAllJobHistory = function (callback) {
    UserJobDB.find(function (err, jobs) {
        if(err || !jobs){
            return callback(err);
        }
        return callback(null, jobs);
    }).sort({createdOn:-1});//.limit(5).skip(pageNumber);
}

exports.GetBusinessProfileInfoforCustomer = function (req,res,callback){
    BusinessProfileDB.find({UserId : req.params.id},function(err,BusinessProfileInfo){
        if(err || !BusinessProfileInfo){
            return callback(err);
        }
        return callback(null, BusinessProfileInfo);
    }).sort({DateCreated :-1});
}

exports.GetBusinessProfileInfo = function (req,res,callback){
    BusinessProfileDB.find({UserId : req.user.id},function(err,BusinessProfileInfo){
        if(err || !BusinessProfileInfo){
            return callback(err);
        }
        return callback(null, BusinessProfileInfo);
    }).sort({DateCreated :-1});
}
/*
*  This function creates an alert if the alert does not exisit
*  if there is already an existing alert then remove the existing one and replace it with a different one.
*
* */
exports.CreateOneAlert = function(req,res){
    // Geocoding
    geocoder.geocode(req.body.ZipCode, function ( err, data ) {

        async.auto([
            function(callback){
                AlertDB.remove({User : req.user.id},function(err){
                    if(err) console.log("Error When Removing an Alert" + err);
                    callback();
                })}
            ,function(callback){
                AlertDB.create({
                    User : req.user.id,
                    Words : req.body.Words,
                    ZipCode : req.body.ZipCode,
                    MilesDistance : req.body.MilesDistance,
                    Lat: data.results[0].geometry.location.lat,
                    Lng: data.results[0].geometry.location.lng
                },function(err){
                    if(err) console.log(err);
                    callback();
                })}
        ],function(err){
            if(err) console.log(err);
            res.redirect('/Business/home');
        })

    });

}

exports.GetBusinessAccountInfo = function(req,res){
    AccountInfoDB.find({_id:req.user.id},function(err,Info){
        res.json(Info);
    })
}