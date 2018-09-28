/*
   This file is the model for userProfile Schema. 
   It specifies how the structure of the schema will look for a user's profile.
*/

var mongoose = require('mongoose');
var userProfileSchema = mongoose.Schema;


// create a schema structure for the document.
// The document will be saved in the database in a JSON object
var userProfileSchema = new userProfileSchema({

	firstName : {
        	type : String,
		required : true	
	},
        lastName : {
		type : String,
		required : true 
	},
	username :{
		type : String,
		required : true
	}, 

	phoneNumber :{
		type : Number,
		required : true
	}, 

	password :{
		type : String,
		required :true
	},
	createdOn: { type: Date, default: Date.now } 

});


module.exports = mongoose.model('UserProfile', userProfileSchema);
