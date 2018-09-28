var express = require('express');
var router = express.Router();
var jobDB = require('../models/Job.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/GetJobHistory', function(req, res, next) {
  jobDB.find( { jobOwner: "abx1234" }, function(err,jobs){
    if(err){
      err.send(err);
    }
    //console.log(jobs);
    res.json(jobs);
  });
});

module.exports = router;
