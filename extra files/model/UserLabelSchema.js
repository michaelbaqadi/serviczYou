/**
 * Created by michael.baqadi on 9/30/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var label = require('labelsSchema.js');

var userLablesSchema = new Schema({
    username  : {type : String, default : 'testuser'},
    LabelsList : [label]
});

model.exports = userLablesSchema;
