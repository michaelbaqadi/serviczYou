/*
 * Created by Larry Huynh on 11/6/15.
 */
var express = require('express');
var router = express.Router();
var qaController = require('../controllers/job-info/qa.server.controller.js');

router.get('/qa',function (req, res){
    qaController.viewJobInfoQA(req, res);
});

router.post('/qa',function (req, res){
    qaController.createJobInfoQA(req, res);//, function(err, result){
    //res.json(result);
    //});
});

module.exports = router;
