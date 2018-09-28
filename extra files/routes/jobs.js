var uuid = require('node-uuid');
var jobDB = require('../node_modules/jobFormSchema');
var jobOfferDB = require('../node_modules/jobOfferSchema');

module.exports = function(express, db){

	var router = express.Router();


    //Get categories
	router.get('/categories', function(req, res ) {
		var categories = [ "Business Relations Jobs", "Engineering", "IT", "Oil", "Public Health", "Construction", "Finance", "Logistics", "Part Time", "Sales"];
			
		res.json(categories);
	});
    
	//Get list of all jobs 
	router.get('/', function(req, res ) {
		res.render('search');
	});
    
    //Get list of all jobs 
	router.get('/all', function(req, res ) {

	});

	router.post('/searchresults',function(req,res){

		jobDB.find({
			title :    new RegExp(req.body.jobTitle, 'i'),
			jobOwner : new RegExp(req.body.username, 'i'),
			category : new RegExp(req.body.category, 'i'),
		},
		 function(err, jobMatchList){
			 if(err){
				 err.send(err);
			 }
			 res.json(jobMatchList);
		 }
		);
	});

	router.post('/getjobfromid',function(req,res){
		retStatus = 'Success';
		res.send({
			retStatus : retStatus,
			redirectTo: '/',
			msg : 'Just go there please' // this should help
		});
	});

	// default param for id
	router.param('id', function(req, res, next, val) {
		req.params.id = val;
		next();
	});

	// uses the above param id to set req.params.id to val
	router.post('/createnewoffer/:id',function(req,res){
		jobOfferDB.create({
			jobID 				: req.params.id,
			confirmationNumber	: uuid.v4(),
			jobOfferOwner		: req.session.username,
			price 				: req.body.price,
			comment 			: req.body.comment
		})
	});

	router.get('/getmyjobs', function(req,res){
		jobDB.find({jobOwner : req.session.username},
			function(err, jobs){
				if(err){
					err.send(err);
				}
				res.json(jobs);
			}
		);
	});

	// retrieve the id
	router.get('/getmyjobs/:id', function(req,res){
		jobDB.find({_id : req.params.id},
				function(err, jobs){
					if(err){
						err.send(err);
					}
					res.json(jobs);
				}
		);
	});

	// return a list of job offers by the user
	router.get('/getmyjobsoffers', function(req,res){
		console.log("jobofferlist");
		jobOfferDB.find({jobOfferOwner : req.session.username},
			function(err, jobs){
				if(err){
					err.send(err);
				}
				res.json(jobs);
			}
		);
	});

	router.post('/viewJob', function(req,res){
		retStatus = 'Success';
		res.send({
			retStatus : retStatus,
			redirectTo: '/jobs/viewJob?id='+req.body._id,
			msg : 'Just go there please',
			jobID : req.body._id
		});
	})

	router.get('/viewJob', function (req, res, next) {
		res.render('create-job-offer.jade');
	});

	return router;
}