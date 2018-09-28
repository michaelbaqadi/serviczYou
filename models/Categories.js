/**
 * Created by michael.baqadi on 2/21/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Category', {
    Category:String,
    SubCategories:[String]
    ,
    DateCreated:{type: Date, default: Date.now}
});
