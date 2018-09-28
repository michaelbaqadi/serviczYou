/**
 * Created by michael.baqadi on 1/16/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('job', {
    jobOwner : String, // person who created the job
    jobAssignee : String, // person who is doing the job
    activeJob : {type : Boolean, default : 1}, // if job is still open
    status : {default : "Open", type : String},
    title : {type : String, default: ''},
    description : {type : String, default: ''},
    price : {type : Number},
    startDate : {type : Date},
    endDate : {type : Date},
    category : String,
    email : {type : String, default: ''},
    createdOn: { type: Date, default: Date.now },
    street : String,
    city: String,
    state : String,
    country : String,
    zipCode : String,
    latitude: {type : Number},
    longitude: {type : Number},
    delete: {type : Boolean, default : 0},
    Labels : [String],
    online : {type : Boolean, default : 0}
    /*offers : {
        username : String,
        offerPrice : Number,
        offerComment : String
    },
    numOfOffers : {type : Number, default: 0}*/
});
