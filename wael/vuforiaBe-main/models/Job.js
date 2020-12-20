const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const jobModel = new Schema({

    subject:  {type: String, required: true},
    frequency:  {type: Number, required: true},
    image_original_url: {type:String}
})

module.exports = mongoose.model('job',jobModel);