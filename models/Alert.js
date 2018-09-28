/**
 * Created by Michael on 4/17/2016.
 */
/**
 * Created by michael.baqadi on 2/21/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Alert', {
    User: String,
    Words: String,
    ZipCode : Number,
    MilesDistance : Number,
    Lat :  Number,
    Lng :  Number
});

