var express= require('express')


var routes = function() {
    var manageRouter = express.Router();
    var manageController= require('../controllers/manageControllers')();

    manageRouter.route('/jobs')
        .get(manageController.getJobs)
        .post(manageController.postJob)

    manageRouter.route('/jobs/:_id')
        .delete(manageController.deleteJob)

    manageRouter.route('/users')
        .get(manageController.getUsers)

    return manageRouter;
};
module.exports=routes;

