const Jobs  = require('../models/Job');
const Users  = require('../models/User');
const request = require('request');
const _ =require('lodash');
const manageControllers = function (){
    const getJobs = function (req, res) {
        Jobs.find({}, function (error, result) {
            if (error) {
                res.status(500).send({'error': error});
            } else {
                res.status(200).send({'results': result ? result:[]})
            }
        })

    };



    const postJob = function (req, res) {


        request('https://api.giphy.com/v1/gifs/random?api_key=u7FGgfnC1zlt8sx98EmjBe2Gg7RwEd9P&tag=&rating=g', { json: true }, function(err, res1, body) {
            if (err) { return console.log(err); }
            else
            {
                const job = new Jobs(req.body);
                job["image_original_url"]=  body.data.image_original_url;


                job.save(function (error, result) {
                    if (error) {
                        res.status(500).send({'error': error});
                    } else {
                        res.status(200).send({'results': result});
                    }
                });
            }

            });
    };

    const deleteJob = function(req,res)
    {
        Jobs.remove({_id: req.params._id}, function (error, result) {
            if (error) {
                res.status(500).send({'error': error});
            } else {
                res.status(200).send({'data': result});
            }
        })
    }
    const getUsers = function(req,res){

        Users.find({}, function (error, result) {
            if (error) {
                res.status(500).send({'error': error});
            } else {
                res.status(200).send({'data': result ? result : []})
            }
        })
    }
    return {
        getJobs: getJobs,
        postJob:postJob,
        deleteJob:deleteJob,
        getUsers:getUsers
    }
}

module.exports = manageControllers;