/**
 * Created by michael.baqadi on 3/11/16.
 */
/**
 * Created by michael.baqadi on 1/16/16.
 */
var express = require('express');
var CategoriesDB = require("../../models/Categories.js")

module.exports = function(app, passport) {
    app.post('/Admin/CreateCategories', function (req, res) {
       CategoriesDB.create({

       }, function(req,res){

       })
    });

    app.post('/Admin/CreateNewCategory', function (req, res) {
        console.log("inside create categories " + JSON.stringify(req.body));
        CategoriesDB.create({
            Name : req.body.Name,
            SubCategories : req.body.CategoriesList
        }, function(err,doc){
            if(err) console.log('Error : ' + err);
        })
    });

    app.get('/Admin/CreateCategory', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('CreateCategory.jade');
    });
}