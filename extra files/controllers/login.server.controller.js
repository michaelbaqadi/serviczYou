var findonemodel = require('../node_modules/userProfileSchema.js');

exports.usernameCheck = function (req, res, callback){	
    findonemodel.findOne({username: req.body.username}, function(err, user) 
    {
    	// If error or no username in the database, then allow user input
    	if (err || !user)
    		return callback(null, true);

    	// If it goes past the if statement, then that means username is already in database
    	return callback(null, false);
    });
}

exports.emailCheck = function (req, res, callback){  
    findonemodel.findOne({email: req.body.email}, function(err, user) 
    {
        // If error or no email in the database, then allow user input
        if (err || !user)
            return callback(null, true);

        // If it goes past the if statement, then that means email is already in database
        return callback(null, false);
    });
}


