/**
 * Created by michael.baqadi on 1/23/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('JobOffer', {
    JobID               : {type : String},
    ConfirmationNumber  : {type : String},
    JobOfferOwnerID       : {type : String},
    Price               : {type : Number},
    Comment             : {type : String},
    DateCreated         : { type: Date, default: Date.now }
});
