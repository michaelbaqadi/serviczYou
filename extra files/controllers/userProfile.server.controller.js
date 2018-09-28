var NewCustomerProfile = require ('../node_modules/userProfileSchema.js');
var NewBusinessProfile = require ('../node_modules/companyProfileInfoSchema.js');
var auth = require ('../controllers/auth.server.controller.js');

// Add a new Entry to UserProfile Document
exports.createCustomerProfile = function (req,res){
        var entry = new NewCustomerProfile({
		firstName	:	req.body.name,
		lastName	:	req.body.name,
		username	:	req.body.username,
		email		:   req.body.email,
		password	:	auth.createHashPassword(req.body.psw),	
		phoneNumber	:	parseInt(req.body.number)
	});

	
	
	entry.save();

	// if adding the entry fails then it will shouldup and error in the console.
	entry.save(function (err, entry) {
  		if (err) return console.error(err);
  		entry.speak();
	});
}

exports.createBusinessProfile = function (req,res){
	var entry = new NewBusinessProfile({
		Name	:	req.body.name,
		username	:	req.body.username,
		email		:   req.body.email,
		/*Address		:   "",
		WebURL		: 	"",
		Categories	:	"",
		Description	:	"",*/
		password	:	auth.createHashPassword(req.body.psw),
		phoneNumber	:	parseInt(req.body.number)
	});



	entry.save();

	// if adding the entry fails then it will shouldup and error in the console.
	entry.save(function (err, entry) {
		if (err) return console.error(err);
		entry.speak();
	});
}
/*
 username : String,
 email : String,
 Name : String,
 Address : String,
 WebURL : String,
 PhoneNumber : String,
 Categories : String,
 Description : String,
 */