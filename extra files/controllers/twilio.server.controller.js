// Create a new REST API client to make authenticated requests against the
// twilio back end 
var TWILIO_ACCOUNT_SID = "AC40f00c2cf91b9ecf813b0ce1727147c0";
var TWILIO_AUTH_TOKEN = "0bd9a34287f63336eba4db0720e3febd";
var client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialization for you.
//var TO_NUMBER = "+14088233795";
var TWILIO_NUMBER = "+14084007628";

exports.createTwilio = function (req,res){	
	client.sms.messages.create({
		to:req.body.number,
		from:TWILIO_NUMBER,
		body:req.body.message,
	}, function(error, message){
		// The HTTP request to Twilio will run asynchronously. This callback
		// function will be called when a response is received from Twilio
		// The "error" variable will contain error information, if any.
		// If the request was successful, this value will be "false"
		if(!error){
			// The second argument to the callback will contain the information
			// sent back by Twilio for the request. In this case, it is the
			// information about the text message you just sent:
			console.log('Success! The SID for this SMS message is:');
			console.log(message.sid);

			console.log('Message sent on:');
			console.log(message.dateCreated);
		}
		else{
			console.log('Oops! There was an error.');
		}
	});
}