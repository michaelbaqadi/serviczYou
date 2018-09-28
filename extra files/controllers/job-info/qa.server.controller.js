/*
 * Created by Larry Huynh on 11/6/15.
 */
var NewJobInfoQA = require('../../node_modules/QASchema.js');

// Add a new Entry to UserProfile Document
exports.createJobInfoQA = function (req,res){
    var entry = new NewJobInfoQA({
        username : req.session.username,
        title    : req.body.title,
        question : req.body.question,
        job_id   : "563453206d675e7c0f8657bc"
    });

    entry.save();

    // if adding the entry fails then it will shouldup and error in the console.
    entry.save(function (err, entry) {
        if (err) return console.error(err);
        entry.speak();
    });
}

// View Jobs
exports.viewJobInfoQA = function (req, res){
    NewJobInfoQA.find(function (err, docs) {
        if(err){
            res.send(err);
        }
        else {
            res.json(docs);
        }
    });
}