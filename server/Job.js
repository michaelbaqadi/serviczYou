var UserJobDB = require('../models/Job.js');
var JobOfferDB = require('../models/JobOffer.js');
var CategoriesDB = require('../models/Categories.js');
var bussinesDB = require('../models/Business.js');
var async = require('async');

//Get all job history from every user
exports.GetJobFromID = function (id, callback) {
  UserJobDB.find( { _id: id, delete: 0}, function(err, jobs){
    if(err || !jobs){
      return callback(err);
    }

    var arrayResult = [];
    jobs.forEach(function (value) {
      arrayResult.push(function (callback) {
        JobOfferDB.aggregate(
            {
              $match: {JobID: value._id.toString()}
            },
            {
              $group: { _id: null, count: { $sum: 1 } }
            }, function (err, jobs) {
              var count = (jobs.length > 0)? jobs[0].count : 0;

              async.waterfall([
                function(callback) {
                  CategoriesDB.findOne({_id: value.category}, function (err, category) {
                    if(err || !category) return callback(err, {image: 'icon_none'});
                    return callback(null, category);
                  })
                }
              ], function (error, results) {
                callback(null, joinedresult(value._id.toString(), value.jobOwner, value.jobAssignee, value.activeJob, value.status, value.title, value.description, value.price, value.startDate, value.endDate,
                    results , value.email, value.createdOn, value.street, value.city, value.state, value.country, value.zipCode, value.latitude, value.longitude,
                    value.delete, value.online, count));
              });
            });
      });
    });

    async.parallel(arrayResult, function (err, result) {
      return callback(null, result);
    });

    //return callback(null, jobs);
  });
}

//Get one job based on the job id
exports.GetOneJobFromJobID = function (userID, jobID, callback) {
  UserJobDB.findOne( { jobOwner: userID, _id: jobID}, function(err, jobs){
    if(err || !jobs){
      return callback(err);
    }
    return callback(null, jobs);
  });
}

//Get all job history from every user
exports.GetAllJobHistory = function (callback) {
  UserJobDB.find({delete: 0}, function (err, jobs) {
    if(err || !jobs){
      return callback(err);
    }
    var arrayResult = [];
    jobs.forEach(function (value) {
          arrayResult.push(function (callback) {
            JobOfferDB.aggregate(
                {
                  $match: {JobID: value._id.toString()}
                },
                {
                  $group: { _id: null, count: { $sum: 1 } }
                }, function (err, jobs) {
                  var count = (jobs.length > 0)? jobs[0].count : 0;

                  async.waterfall([
                    function(callback) {
                      CategoriesDB.findOne({_id: value.category}, function (err, category) {
                        if(err || !category) return callback(err, {image: 'icon_none'});
                        return callback(null, category);
                      })
                    }
                  ], function (error, results) {
                    callback(null, joinedresult(value._id.toString(), value.jobOwner, value.jobAssignee, value.activeJob, value.status, value.title, value.description, value.price, value.startDate, value.endDate,
                        results , value.email, value.createdOn, value.street, value.city, value.state, value.country, value.zipCode, value.latitude, value.longitude,
                        value.delete, value.online, count));
                  });
                });
          });
        });

      async.parallel(arrayResult, function (err, result) {
        return callback(null, result);
      });
  }).sort({createdOn:-1});
}

exports.GetJobOffers = function (id, callback) {
  JobOfferDB.aggregate([
    {
      $match: {JobID: id}
    },
    {
      $sort: {DateCreated: -1}
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
      return;
    }

    function joinedresult(_id, JobID, ConfirmationNumber, JobOfferOwnerID, Price, Comment, DateCreated, __v, companyName) {
      return {
        "_id": _id,
        "JobID": JobID,
        "ConfirmationNumber": ConfirmationNumber,
        "JobOfferOwnerID": JobOfferOwnerID,
        "Price": Price,
        "Comment": Comment,
        "DateCreated": DateCreated,
        "__v": __v,
        "companyName": companyName
      };
    };
    var arrayResult = [];

    result.forEach(function (value) {
          arrayResult.push(function (callback) {
            bussinesDB.findOne({_id: value.JobOfferOwnerID}, function (err, jobs) {
              callback(null, joinedresult(value._id,value.JobID,value.ConfirmationNumber, value.JobOfferOwnerID,
                  value.Price, value.Comment, value.DateCreated, value.__v, jobs.local.businessname));
            });
          });
        }
    );

    async.parallel(arrayResult, function (err, result) {
      /* this code will run after all calls finished the job or
       when any of the calls passes an error */
      if (err)
        return console.log(err);
      return callback(null, result);
    });
  })
}

function joinedresult(id, jobOwner, jobAssignee, activeJob, status, title, description, price, startDate, endDate,
                      category, email, createdOn, street, city, state, country, zipCode, latitude, longitude,
                      deleteNum, online, numOfOffers) {
  return {
    "_id" : id,
    "jobOwner": jobOwner, // person who created the job
    "jobAssignee": jobAssignee, // person who is doing the job
    "activeJob": activeJob, // if job is still open
    "status": status,
    "title": title,
    "description": description,
    "price": price,
    "startDate": startDate,
    "endDate": endDate,
    "category": category,
    "email": email,
    "createdOn": createdOn,
    "street": street,
    "city": city,
    "state": state,
    "country": country,
    "zipCode": zipCode,
    "latitude": latitude,
    "longitude": longitude,
    "delete": deleteNum,
    "online": online,
    "numOfOffers": numOfOffers
  };
};

//Get job history from one specific user
exports.GetAllUserJobHistory = function (owner, callback){
  //UserJobDB.find( { jobOwner: owner, delete: 0}, function(err, jobs){
  //  if(err || !jobs){
  //    return callback(err);
  //  }
  //  return callback(null, jobs);
  //}).sort({createdOn:-1});

  UserJobDB.aggregate([
    {
      $match: {jobOwner: owner, delete: false}
    },
    {
      $sort: {createdOn: -1}
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
      return;
    }

    var arrayResult = [];

    result.forEach(function (value) {
          arrayResult.push(function (callback) {
            JobOfferDB.aggregate(
              {
                $match: {JobID: value._id.toString()}
              },
              {
                $group: { _id: null, count: { $sum: 1 } }
              }, function (err, jobs) {
              var count = (jobs.length > 0)? jobs[0].count : 0;

                  async.waterfall([
                    function(callback) {
                      CategoriesDB.findOne({_id: value.category}, function (err, category) {
                        if(err || !category) return callback(err, {image: 'icon_none'});
                        return callback(null, category);
                      })
                    }
                  ], function (error, results) {
                    callback(null, joinedresult(value._id.toString(), value.jobOwner, value.jobAssignee, value.activeJob, value.status, value.title, value.description, value.price, value.startDate, value.endDate,
                        results , value.email, value.createdOn, value.street, value.city, value.state, value.country, value.zipCode, value.latitude, value.longitude,
                        value.delete, value.online, count));
                  });
            });
          });
        }
    );

    async.parallel(arrayResult, function (err, result) {

      if (err)
        return console.log(err);

      return callback(null, result);
    });
  });
}

//Get Number of Jobs
exports.GetUserJobCount = function (callback){
  return UserJobDB.count(function (e, count) {
    return callback(e, count);
  });
}

//Create Job for one specific user
exports.CreateUserJob = function (req, callback){
  var entry = new UserJobDB({
    jobOwner : req.user.id,
    startDate: req.body.startDate,
    endDate  : req.body.endDate,
    category : req.body.category._id,
    email    : ((req.body.email === "")?req.user.email:req.body.email),
    street   : req.body.street,
    city     : req.body.city.name,
    state    : req.body.state,
    country  : req.body.country,
    zipCode  : req.body.zipCode,
    latitude : req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
    title    : req.body.title,
    price    : req.body.price
  });

  entry.save();

  // if adding the entry fails then it will shouldup and error in the console.
  entry.save(function (err) {
    if (err) return console.error(err);
  });
}

//Create Job for one specific user
exports.CreateUserJobSession = function (userID, req, callback){
  var entry = new UserJobDB({
    jobOwner : userID,
    startDate: req.startDate,
    endDate  : req.endDate,
    category : req.category._id,
   // email    : ((req.email === "")?req.user.email:req.email),
    email    : req.email,
    street   : req.street,
    city     : req.city.name,
    state    : req.state,
    country  : req.country,
    zipCode  : req.zipCode,
    latitude : req.latitude,
    longitude: req.longitude,
    description: req.description,
    title    : req.title,
    price    : req.price
  });

  entry.save();

  // if adding the entry fails then it will shouldup and error in the console.
  entry.save(function (err) {
    if (err) return console.error(err);
  });
}

// Edit Job from DataBase
exports.UpdateUserJob = function (req, callback) {
  UserJobDB.update( { _id: req.body.jobID, jobOwner: req.user._id},
      { $set: {    jobOwner : req.user.id,
        startDate: req.body.startDate,
        endDate  : req.body.endDate,
        category : req.body.category._id,
        email    : req.body.email,
        street   : req.body.street,
        city     : req.body.city.name,
        state    : req.body.state,
        country  : req.body.country,
        zipCode  : req.body.zipCode,
        latitude : req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        title    : req.body.title,
        price    : req.body.price}}
      , function(err, result){
    if(err || !result){
      return callback(err);
    }
    return callback(null, result);
  });
}

// Delete Job from DataBase
exports.DeleteJobID = function (userID, id, callback) {
  UserJobDB.update( { _id: id, jobOwner: userID}, { $set: {delete: 1}}, function(err, result){
    if(err || !result){
      return callback(err);
    }
    return callback(null, result);
  });
}

//Get all job history from every user
exports.GetAllCategory = function (callback) {
  CategoriesDB.find(function (err, category) {
    if(err || !category){
      return callback(err);
    }
    return callback(null, category);
  });
}