// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        firstname : String,
        lastname : String,
        businessname : String,
        address : {
            address : String,
            address : String,
            city : String,
            state: String,
            country : String
        },
        phonenumber : String,
        Labels : [String]
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    activationToken: String,
    activationExpires: Date,
    isActivated: Boolean

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Business', userSchema);