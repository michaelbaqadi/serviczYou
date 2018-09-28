var UserModel = require('../models/User.js');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.usernameCheck = function (req, res, callback){

    UserModel.findOne({'local.username': req.body.username}, function(err, user)
    {
        // If error or no username in the database, then allow user input
        if (err || !user) {
            console.log("NO USERNAME FOUND");
            return callback(null, true);
        }
        console.log("USER NAME FOUNDED");
        // If it goes past the if statement, then that means username is already in database
        return callback(null, false);
    });
}

exports.emailCheck = function (req, res, callback){
    UserModel.findOne({'local.email': req.body.email}, function(err, user)
    {
        // If error or no email in the database, then allow user input
        if (err || !user) {
                return callback(null, true);
        }

        // If it goes past the if statement, then that means email is already in database
        return callback(null, false);
    });
}


exports.updateProfile = function (req, res, callback){
    console.log(req.user);
    UserModel.findOne({_id: req.user.id }, function(err, user)
    {
        // If error or no email in the database, then allow user input
        if (err || !user) {
            console.log("NO USER FOUND");
            return callback(null, true);
        }
        else
        {
            console.log("User Found");
            if(req.user) {
                console.log("User GET IN");

                var user            = req.user;
                user.local.address.address1    = req.body.address1;
                user.local.address.zipcode    = req.body.zipcode;
                user.local.address.city    = req.body.city;
                user.local.address.country    = req.body.country;
                user.local.address.state    = req.body.state;
                user.local.bio    = req.body.bio;
                user.local.phonenumber    = req.body.phonenumber;
                if (req.body.changeEmail == "on")
                {
                    console.log("EMAIL CHANGE RESQUESTED");
                    user.local.email    = req.body.email;

                }
                if (req.body.changePassword == "on")
                {
                    console.log("PASSWORD CHANGE RESQUESTED");
                    user.local.password = user.generateHash(req.body.password);
                }
                user.save(function(err) {
                    if (err) {
                        throw err;
                        console.log("ERROR");

                    }
                    console.log("SAVE SUCCESS");

                    return callback(null, user);
                });
            }
        }

        // If it goes past the if statement, then that means email is already in database
        return callback(null, false);
    });

}

exports.forgotPassword = function (req, res, next){
    async.waterfall([
        function(callback) {
            console.log("Generate ResetToken");
            // Generating Token for Forgot Password
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                callback(err, token);
            });
        },
        function(token, callback) {
            UserModel.findOne({ 'local.email': req.body.email }, function(err, user) {
                if (!user) {
                    console.log("No Account with that email address exists");
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgotPassword');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    console.log("Save Token");
                    callback(err, token, user);
                });
            });
        },
        function(token, user, callback) {
            console.log("Create Transport Token");
            var smtpTransport = nodemailer.createTransport({
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
                from: 'Test@gmail.com',
                subject: 'ServizYou Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            console.log("Done Create Transport Token");
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log("Sending Email");
                req.flash('info', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
                callback(err, 'done');
            });
        }
    ], function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/forgotPassword');
    });



}

exports.recoverPassword = function (req, res, done) {
    console.log(req.params.token);
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log("TOKEN IS INVALID");
            req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgotPassword');
        }
        res.render('User/ResetPassword.jade',
            {
            user: req.user,
            req :req
        });
    });
}

exports.recoverPasswordPOST = function (req, res, done) {
    async.waterfall([
        function(done) {
            UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    done(null, false, req.flash('error', 'Password reset token is invalid or has expired.'));

                    return res.redirect('back');
                }

                //user.local.password = req.body.password;
                user.local.password =  user.generateHash(req.body.password);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
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
                }
            );
            var mailOptions = {
                to: user.local.email,
                from: 'passwordreset@servizyou.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {


                done(err, req.flash('success', 'Success! Your password has been changed.'));
            });
        }
    ], function(err) {
        res.redirect('/home');
    });
}



exports.activateAccount = function (req, res, done) {
    console.log("TOKEN : " + req.params.token);

    async.waterfall([
        function(done) {
            UserModel.findOne({ activationToken: req.params.token, /* COMMENT: THIS IS USE FOR DELETE NON ACTIVE USER
            activationExpires: { $gt: Date.now() }*/ }, function(err, user) {
                if (!user) {
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    done(null, false, req.flash('error', 'Invalid Token'));
                    return res.redirect('/login');
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
            });
        },
        function(user, done) {
            if (!user) {
                return res.redirect('/login');
            }
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
                    from: 'accountActivate@servizyou.com',
                    subject: 'Your Account has been activated',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the account with email: ' + user.local.email + ' has been activated.\n'
                };

                smtpTransport.sendMail(mailOptions, function (err) {
                    done(err, req.flash('success', 'Success! Your account has been activated.'));
                });

        }
    ], function(err) {
        res.redirect('/home');
    });
}


exports.getUserInfo = function ( req, res, callback) {
    console.log("TEST");

    console.log(req.user);
    UserModel.findOne( {_id: req.user.id }, function (err, user) {
        if (err || !user) {
            return callback(err);
        }
        return callback(null, user);
    });
}

exports.email_form = function ( req, res, callback) {

    console.log("TESTTT");

    var smtpTransport = nodemailer.createTransport({
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
    console.log("DONE SNMPT Transport For Email Verification");

    var mailOptions = {
        to: 'servizyou@gmail.com',
        from: req.body.email,
        subject: 'ServizYou Contact Form',
        text: 'From : ' + req.body.email + '\n\nMessage: ' + req.body.message
    };

    console.log("Sending Email Verification");

    smtpTransport.sendMail(mailOptions, function(err) {
        console.log("Sending Email");
    });
    console.log("Done Email Verification");

    if(req.body)
    {
        return callback(null, true);
    }else
    {
        return callback(null, false);
    }


}
