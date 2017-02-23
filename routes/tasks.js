var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://misys:misys@ds139899.mlab.com:39899/searchrecorddb', ['tasks']);


router.get('/tasks', function (req, res, next) {
    //res.send('This is Vanishri Page');
    //get all tasks
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });

});

//get single task

router.get('/task/:id', function (req, res, next) {
    db.issuerecords.findOne({ _id: mongojs.ObjectID(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });

});

//save task

router.post('/task', function (req, res, next) {
    var task = req.body;
    console.log('Post request recieved Task -> ' + JSON.stringify(task));
    // if(!task.title||(task.isDone +'')){
    //     res.status(400);
    //     res.json({
    //         "error":"bad data"
    //     });
    // }
    // else{
    db.tasks.save(task, function (err, task) {
        if (err) {
            console.log('error in saving task -> ' + err);
            res.send(err);
        }
        res.json(task);
    });

    // }



});


//delete tasks


router.delete('/task/:id', function (req, res, next) {
    db.issuerecords.remove({ _id: mongojs.ObjectID(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });

});



//update tasks

router.put('/task/:id', function (req, res, next) {

    var task = req.body;
    var updTask = {};

    if (task.isDone) {

        updTask.isDone = task.isDone;
    }


    if (task.title) {

        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({ "error": "Bad data" });
    }

    else {


        db.issuerecords.update({ _id: mongojs.ObjectID(req.params.id) }, updTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });




    }

    db.issuerecords.remove({ _id: mongojs.ObjectID(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });

});




module.exports = router;





;
