var BusinessModel = require('../../models/Business.js');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.businessnameCheck = function (req, res, callback){

    console.log("Business Name Check");
    BusinessModel.findOne({'local.businessname': req.body.businessname}, function(err, user)
    {
        console.log("Business Name : " + req.body.businessname);

        // If error or no username in the database, then allow user input
        if (err || !user) {
            console.log("NO Business FOUND");
            return callback(null, true);
        }
        console.log("USER NAME FOUNDED");
        // If it goes past the if statement, then that means username is already in database
        return callback(null, false);
    });
}

exports.emailCheck = function (req, res, callback){
    console.log("Business Email Check");

    BusinessModel.findOne({'local.email': req.body.email}, function(err, user)
    {
        // If error or no email in the database, then allow user input
        if (err || !user) {
            return callback(null, true);
        }

        // If it goes past the if statement, then that means email is already in database
        return callback(null, false);
    });
}


exports.activateAccount = function (req, res, done) {
    console.log("TOKEN : " + req.params.token);

    async.waterfall([
        function(done) {
            BusinessModel.findOne({ activationToken: req.params.token, /* COMMENT: THIS IS USE FOR DELETE NON ACTIVE USER
             activationExpires: { $gt: Date.now() }*/ }, function(err, user) {
                if (!user) {
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    done(null, false, req.flash('error', 'Invalid Token'));
                    return res.redirect('/Business/login');
                }

                //user.local.password = req.body.password;
                user.activationToken = undefined;
                user.activationExpires = undefined;
                user.isActivated = true;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
                console.log("USER TOKEN : " + user.local);
                console.log("USER EMAIL : " + user.local.email);
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport(
                {
                    service: 'Gmail',
                    auth: {
                        XOAuth2: {
                            user: "servizyou@gmail.com", // Your gmail address.
                            clientId: "73760644132-22u3r8r0d1smf5854sdnqv8tu8bclut8.apps.googleusercontent.com",
                            clientSecret: "RmgZWGTYLLXeaQM77CDOe6-q",
                            refreshToken: "1/gy1rP-DUHIEjuC-e9FntQzE9miDoIsWa3WBU8-r18mwMEudVrK5jSpoR30zcRFq6"
                        }

                    },
                    logger: true, // log to console
                    debug: true // include SMTP traffic in the logs
                });
            var mailOptions = {
                to: user.local.email,
                from: 'accountActivate@ServizYou.com',
                subject: 'Your Account has been activated',
                text: 'Hello,\n\n' +
                'This is a confirmation that the account with email: ' + user.local.email + ' has been activated.\n'
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                done(err, req.flash('success', 'Success! Your account has been activated.'));
            });
        }
    ], function(err) {
        res.redirect('/Business/EditProfile');
    });
}





