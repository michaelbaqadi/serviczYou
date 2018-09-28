/**
 * Created by michael.baqadi on 2/5/16.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Address =  {
    Street: String,
    SuiteNumber : String,
    City: String,
    State: String,
    Country: String
};
module.exports = mongoose.model('BusinessProfileInfo', {
    UserId  : String,
    MainAddress : [Address],
    WebURL : String,
    PhoneNumber : String,
    ContactEmail : String,
    Categories : [String],
    AdditionalInfo : String,
    DateCreated         : { type: Date, default: Date.now }
});