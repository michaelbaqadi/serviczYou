var auth = require ('../controllers/auth.server.controller.js');
var User = require ('../node_modules/userProfileSchema.js');
var BusinessDB = require ('../node_modules/companyProfileInfoSchema.js');

exports.checkUser = function(username, password, role, callback) {
    // check in mongo if a user with username exists or not
    // role == 0 is customer
    if(role == 0) {
        User.findOne({'username': username},
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return callback(err);

                // Username does not exist, log error & redirect back
                if (!user) {
                    return callback(null, false);
                }

                // User exists but wrong password, log the error
                if (!auth.isValidPassword(password, user.password)) {
                    return callback(null, false);
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return callback(null, true);
            }
        );
    }
    // else it is business
    else
    {
        BusinessDB.findOne({'username': username},
            function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return callback(err);

                // Username does not exist, log error & redirect back
                if (!user) {
                    return callback(null, false);
                }

                // User exists but wrong password, log the error
                if (!auth.isValidPassword(password, user.password)) {
                    return callback(null, false);
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return callback(null, true);
            }
        );
    }
}