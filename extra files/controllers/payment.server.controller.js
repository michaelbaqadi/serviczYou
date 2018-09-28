// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_FAeJGRuRLIU14yUTriLfkYHG");

// Add a new Entry to UserProfile Document
exports.createPayment = function (req,res){	

	// (Assuming you're using express - expressjs.com)
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;
	var price = req.body.price;
	// format the amount user inputs
	if(price.indexOf('.') > -1) {
		price = price.replace('.','');
	}
	else
	{
		price += "00";
	}
	//create the charge
	var charge = stripe.charges.create({
	  amount: price, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Example charge"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	  }
	});
}
